const categoriesRouter = require("express").Router();
const {
  getAllCategories,
  postNewCategory,
} = require("../controllers/categories.controller");

categoriesRouter.get("/", getAllCategories);
categoriesRouter.post("/", postNewCategory);

module.exports = categoriesRouter;
