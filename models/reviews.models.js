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

exports.selectAllReviews = (sort_by, order, category) => {
  return db.query(`SELECT slug FROM categories;`).then(({ rows }) => {
    const categories = rows;
    console.log(rows);
    console.log(category);
    let count = 0;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].slug === category) {
        count++;
      }
    }
    console.log(count);
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
      queryStr += ` ORDER BY ${sort_by} ${order};`;
      return db.query(queryStr, queryParams).then(({ rows }) => {
        commentCountToNumber(rows);
        return rows;
      });
    }
  });
};

exports.selectAllCommentsByReviewID = (review_id, limit = 10, p = 1) => {
  const offset = (p - 1) * limit;
  console.log(offset, "<<<OFFSET");
  console.log(limit, "<<<LIMIT");
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
