const { query } = require("../db");
const db = require("../db");

exports.selectAllReviewsByID = (id) => {
  return db
    .query(
      "SELECT * , (SELECT COUNT(*) FROM comments WHERE review_id = $1) AS comment_count FROM reviews WHERE review_id = $2;",
      [id, id]
    )
    .then(({ rows }) => rows[0])
    .catch(next);
};
