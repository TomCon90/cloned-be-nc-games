const { query } = require("../db");
const db = require("../db");

exports.selectAllReviewsByID = (review_id) => {
  if (parseInt(review_id) === NaN) {
    return Promise.reject({
      status: 400,
      msg: "Invalid query",
    });
  } else {
    return db
      .query(
        "SELECT * , (SELECT COUNT(*) FROM comments WHERE review_id = $1) AS comment_count FROM reviews WHERE review_id = $2;",
        [review_id, review_id]
      )
      .then(({ rows }) => {
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
  }
};

exports.patchReviewsByID = (review_id, inc_votes) => {
  if (parseInt(review_id) === NaN) {
    return Promise.reject({
      status: 400,
      msg: "Invalid query",
    });
  } else {
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
  }
};

exports.selectAllReviews = (sort_by, order, category) => {
  if (!sort_by) {
    sort_by = "created_at";
  }
  if (!order) {
    order = "ASC";
  }
  const queryParams = [];
  let queryStr = `SELECT * , (SELECT COUNT(*) FROM comments) AS comment_count FROM reviews`;
  if (category) {
    queryStr += ` WHERE category = $1`;
    queryParams.push(category);
  }
  queryStr += ` ORDER BY ${sort_by} ${order};`;
  console.log(queryStr);
  console.log(queryParams);
  return db.query(queryStr, queryParams).then(({ rows }) => {
    console.log(rows);
    return rows;
  });
};
