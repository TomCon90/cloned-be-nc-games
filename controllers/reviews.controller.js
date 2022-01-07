const {
  selectAllReviewsByID,
  patchReviewsByID,
  selectAllReviews,
  selectAllCommentsByReviewID,
  insertComment,
  insertReview,
  removeReview,
} = require("../models/reviews.models");

exports.getAllReviewsByID = (req, res, next) => {
  const { review_id } = req.params;
  selectAllReviewsByID(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.updateReviewsByID = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  patchReviewsByID(review_id, inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getAllReviews = (req, res, next) => {
  const { sort_by, order, category, limit, p } = req.query;
  selectAllReviews(sort_by, order, category, limit, p)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.getCommentsByReviewID = (req, res, next) => {
  const { review_id } = req.params;
  const { limit, p } = req.query;
  selectAllCommentsByReviewID(review_id, limit, p)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postNewComment = (req, res, next) => {
  const { review_id } = req.params;
  console.log(review_id);
  const body = req.body;
  insertComment(review_id, body)
    .then((comment) => {
      res.status(201).send(comment[0]);
    })
    .catch(next);
};

exports.postNewReview = (req, res, next) => {
  const review = req.body;
  insertReview(review)
    .then((review) => {
      review[0].comment_count = 0;
      res.status(201).send(review[0]);
    })
    .catch(next);
};

exports.deleteReviewByID = (req, res, next) => {
  const { review_id } = req.params;
  console.log(review_id);
  removeReview(review_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
