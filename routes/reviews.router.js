const reviewsRouter = require("express").Router();
const { getAllReviewsByID } = require("../controllers/reviews.controller");

reviewsRouter.get("/:id", getAllReviewsByID);

module.exports = reviewsRouter;
