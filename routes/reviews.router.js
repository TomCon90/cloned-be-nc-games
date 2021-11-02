const reviewsRouter = require("express").Router();
const {
  getAllReviewsByID,
  updateReviewsByID,
} = require("../controllers/reviews.controller");

reviewsRouter.get("/:id", getAllReviewsByID);
reviewsRouter.patch("/:id", updateReviewsByID);

module.exports = reviewsRouter;
