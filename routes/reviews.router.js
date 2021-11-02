const reviewsRouter = require("express").Router();
const {
  getAllReviewsByID,
  updateReviewsByID,
  getAllReviews,
} = require("../controllers/reviews.controller");

reviewsRouter.get("/", getAllReviews);
reviewsRouter.get("/:review_id", getAllReviewsByID);
reviewsRouter.patch("/:review_id", updateReviewsByID);

module.exports = reviewsRouter;
