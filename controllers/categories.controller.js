const {
  selectAllCategories,
  insertCategory,
} = require("../models/categories.models");

exports.getAllCategories = (req, res, next) => {
  selectAllCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};

exports.postNewCategory = (req, res, next) => {
  const category = req.body;

  insertCategory(category)
    .then((category) => {
      res.status(201).send(category);
    })
    .catch(next);
};
