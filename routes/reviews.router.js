const reviewsRouter = require("express").Router();
const {
  getAllReviewsByID,
  updateReviewsByID,
  getAllReviews,
  getCommentsByReviewID,
  postNewComment,
  postNewReview,
  deleteReviewByID,
} = require("../controllers/reviews.controller");
const reviews = require("../db/data/test-data/reviews");

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewID)
  .post(postNewComment);
reviewsRouter
  .route("/:review_id")
  .delete(deleteReviewByID)
  .get(getAllReviewsByID)
  .patch(updateReviewsByID);

reviewsRouter.route("/").get(getAllReviews).post(postNewReview);

module.exports = reviewsRouter;
