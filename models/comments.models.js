const db = require("../db");
const { commentCountToNumber } = require("../utils/utils");

exports.selectAllComments = () => {
  return db.query("SELECT * FROM comments;").then(({ rows }) => {
    return rows;
  });
};

exports.removeComment = (comment_id) => {};
