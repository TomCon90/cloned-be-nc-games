const { query } = require("../db");
const db = require("../db");

exports.selectAllCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => result.rows);
};

exports.insertCategory = (category) => {
  const { slug, description } = category;
  if (typeof slug !== "string" || typeof description !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Incorrect data type",
    });
  } else {
    return db
      .query(
        `INSERT INTO categories
       (slug, description)
       VALUES
       ($1, $2)
       RETURNING *;`,
        [category.slug, category.description]
      )

      .then(({ rows }) => rows[0]);
  }
};
