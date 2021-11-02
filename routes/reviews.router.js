const reviewsRouter = require("express").Router();
const {
  getAllReviewsByID,
  updateReviewsByID,
  getAllReviews,
  getCommentsByReviewID,
} = require("../controllers/reviews.controller");

reviewsRouter.get("/", getAllReviews);
reviewsRouter.get("/:review_id", getAllReviewsByID);
reviewsRouter.get("/:review_id/comments", getCommentsByReviewID);
reviewsRouter.patch("/:review_id", updateReviewsByID);

module.exports = reviewsRouter;
