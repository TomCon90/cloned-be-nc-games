const { type } = require("express/lib/response");
const { query } = require("../db");
const db = require("../db");
const { commentCountToNumber } = require("../utils/utils");

exports.selectAllReviewsByID = (review_id) => {
  return db
    .query(
      "SELECT * , (SELECT COUNT(*) FROM comments WHERE review_id = $1) AS comment_count FROM reviews WHERE review_id = $2;",
      [review_id, review_id]
    )
    .then(({ rows }) => {
      commentCountToNumber(rows);
      const review = rows[0];
      if (review === undefined) {
        return Promise.reject({
          status: 404,
          msg: "ID does not exist",
        });
      } else {
        return review;
      }
    });
};

exports.patchReviewsByID = (review_id, inc_votes) => {
  return db
    .query(
      "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;",
      [inc_votes, review_id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (review === undefined) {
        return Promise.reject({
          status: 404,
          msg: "ID does not exist",
        });
      } else if (review.votes === null) {
        return Promise.reject({
          status: 400,
          msg: "Empty object",
        });
      } else {
        return review;
      }
    });
};

exports.selectAllReviews = (sort_by, order, category, limit, p) => {
  return db.query(`SELECT slug FROM categories;`).then(({ rows }) => {
    const categories = rows;

    let count = 0;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].slug === category) {
        count++;
      }
    }

    if (count === 0 && category !== undefined) {
      return Promise.reject({
        status: 400,
        msg: "Bad Request: Invalid category",
      });
    }

    if (!sort_by) {
      sort_by = "created_at";
    }
    if (!order) {
      order = "DESC";
    }
    if (!limit) {
      limit = 10;
    }
    if (!p) {
      p = 1;
    }
    if (
      ![
        "owner",
        "title",
        "review_id",
        "category",
        "review_img_url",
        "created_at",
        "votes",
        "comment_count",
      ].includes(sort_by.toLowerCase())
    ) {
      return Promise.reject({
        status: 400,
        msg: "Bad Request: cannot sort with given parameter",
      });
    } else if (!["asc", "desc"].includes(order.toLowerCase())) {
      return Promise.reject({
        status: 400,
        msg: "Bad Request: Sort order invalid",
      });
    } else {
      const queryParams = [];
      let queryStr = `SELECT reviews.*,
       COUNT(comments.review_id) AS comment_count
       FROM reviews
       LEFT JOIN comments ON 
        reviews.review_id = comments.review_id  `;
      if (category) {
        queryStr += `WHERE reviews.category = $1`;
        queryParams.push(category);
      }
      queryStr += `GROUP BY reviews.review_id`;

      queryStr += ` ORDER BY ${sort_by} ${order}`;

      const offset = (p - 1) * limit;

      queryStr += ` LIMIT ${limit} OFFSET ${offset};`;

      return db.query(queryStr, queryParams).then(({ rows }) => {
        commentCountToNumber(rows);
        return rows;
      });
    }
  });
};

exports.selectAllCommentsByReviewID = (review_id, limit = 10, p = 1) => {
  const offset = (p - 1) * limit;

  return db
    .query(
      `SELECT * 
    FROM reviews 
    WHERE review_id = $1`,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "ID does not exist",
        });
      } else {
        return db
          .query(
            `SELECT * FROM comments WHERE review_id = $1 LIMIT $2 OFFSET $3;`,
            [review_id, limit, offset]
          )
          .then(({ rows }) => rows);
      }
    });
};

exports.insertComment = (review_id, comment) => {
  const { body, votes, username } = comment;
  const author = username;
  if (typeof body === undefined && comment !== undefined) {
    return Promise.reject({
      status: 400,
      msg: "Invalid query",
    });
  } else if (body !== undefined && typeof body !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Incorrect data type",
    });
  } else {
    return db
      .query(
        `INSERT INTO comments
       (body,  author, review_id) 
       VALUES 
       ($1, $2, $3) 
       RETURNING *;`,
        [body, author, review_id]
      )
      .then(({ rows }) => rows);
  }
};

exports.insertReview = (review) => {
  const { title, designer, review_body, category, owner } = review;
  if (
    typeof title !== "string" ||
    typeof designer !== "string" ||
    typeof review_body !== "string"
  ) {
    return Promise.reject({
      status: 400,
      msg: "Incorrect data type",
    });
  } else {
    return db
      .query(
        `INSERT INTO reviews
       (title, designer, owner, review_img_url, review_body, category, created_at, votes, review_id)
       VALUES
       ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *;`,
        [
          title,
          designer,
          owner,
          "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
          review_body,
          category,
          "2021-01-18T10:01:41.251Z",
          0,
          33,
        ]
      )

      .then(({ rows }) => rows);
  }
};

exports.removeReview = (review_id) => {
  return db
    .query(`DELETE FROM reviews WHERE review_id = $1 RETURNING *;`, [review_id])
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: "ID does not exist",
        });
      }
    });
};
