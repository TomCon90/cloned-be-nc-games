const { query } = require("../db");
const db = require("../db");
const users = require("../db/data/test-data/users");
const { commentCountToNumber } = require("../utils/utils");

exports.selectAllUsernames = () => {
  return db.query(`SELECT username FROM users;`).then((result) => result.rows);
};
