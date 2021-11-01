const { query } = require("../db");
const db = require("../db");

exports.selectAllCategories = () => {
  console.log("in select all categories");
  return db.query("SELECT * FROM categories;").then((result) => result.rows);
};
