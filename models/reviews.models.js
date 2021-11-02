const { query } = require("../db");
const db = require("../db");

exports.selectAllReviewsByID = (id) => {
  console.log(parseInt(id));
  if (parseInt(id) === NaN) {
    return Promise.reject({
      status: 400,
      msg: "Invalid query",
    });
  } else {
    return db
      .query(
        "SELECT * , (SELECT COUNT(*) FROM comments WHERE review_id = $1) AS comment_count FROM reviews WHERE review_id = $2;",
        [id, id]
      )
      .then(({ rows }) => {
        const review = rows[0];
        console.log("in then block");
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

exports.patchReviewsByID = (id, inc_votes) => {
  console.log("inside patch reviews");
  return db
    .query(
      "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;",
      [inc_votes, id]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows[0];
    });
};
