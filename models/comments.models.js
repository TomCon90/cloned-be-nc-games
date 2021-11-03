const db = require("../db");
const { commentCountToNumber } = require("../utils/utils");

exports.selectAllComments = () => {
  return db.query("SELECT * FROM comments;").then(({ rows }) => {
    return rows;
  });
};

exports.removeComment = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [
      comment_id,
    ])
    .then(({ rows }) => {
      const user = rows[0];
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: "ID does not exist",
        });
      }
    });
};
