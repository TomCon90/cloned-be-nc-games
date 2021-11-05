const db = require("../db");
const { commentCountToNumber } = require("../utils/utils");

exports.selectAllComments = () => {
  return db.query("SELECT * FROM comments;").then(({ rows }) => {
    return rows;
  });
};

exports.removeComment = (comments_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [
      comments_id,
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

exports.patchCommentsByID = (comments_id, inc_votes) => {
  return db
    .query(
      "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;",
      [inc_votes, comments_id]
    )
    .then(({ rows }) => {
      const comment = rows[0];
      if (comment === undefined) {
        return Promise.reject({
          status: 404,
          msg: "ID does not exist",
        });
      } else if (comment.votes === null) {
        return Promise.reject({
          status: 400,
          msg: "Empty object",
        });
      } else {
        return comment;
      }
    });
};
