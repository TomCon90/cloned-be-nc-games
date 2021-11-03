const reviewsRouter = require("express").Router();
const {
  getAllReviewsByID,
  updateReviewsByID,
  getAllReviews,
  getCommentsByReviewID,
  postNewComment,
} = require("../controllers/reviews.controller");
const reviews = require("../db/data/test-data/reviews");

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewID)
  .post(postNewComment);
reviewsRouter
  .route("/:review_id")
  .get(getAllReviewsByID)
  .patch(updateReviewsByID);

reviewsRouter.get("/", getAllReviews);

module.exports = reviewsRouter;
