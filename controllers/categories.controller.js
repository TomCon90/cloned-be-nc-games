const { selectAllCategories } = require("../models/categories.models");

exports.getAllCategories = (req, res, next) => {
  selectAllCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};
