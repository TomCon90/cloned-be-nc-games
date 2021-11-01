const { selectAllCategories } = require("../models/categories.models");

exports.getAllCategories = (req, res, next) => {
  console.log("in getallcategories");
  selectAllCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};
