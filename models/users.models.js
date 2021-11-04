const { query } = require("../db");
const db = require("../db");
const users = require("../db/data/test-data/users");
const { commentCountToNumber } = require("../utils/utils");

exports.selectAllUsernames = () => {
  return db.query(`SELECT username FROM users;`).then((result) => result.rows);
};

exports.selectUserByUsernameId = (username_id) => {
  let answer = username_id.username;
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [answer])
    .then(({ rows }) => {
      const user = rows[0];
      if (user === undefined) {
        return Promise.reject({
          status: 404,
          msg: "Username does not exist",
        });
      } else {
        return user;
      }
    });
};
