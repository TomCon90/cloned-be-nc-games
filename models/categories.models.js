const { query } = require("../db");
const db = require("../db");

exports.selectAllCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => result.rows);
};
