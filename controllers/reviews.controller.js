const {
  selectAllReviewsByID,
  patchReviewsByID,
  selectAllReviews,
  selectAllCommentsByReviewID,
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
  const { sort_by, order, category } = req.query;
  selectAllReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.getCommentsByReviewID = (req, res, next) => {
  const { review_id } = req.params;
  selectAllCommentsByReviewID(review_id)
    .then((comments) => {
      console.log(comments);
      res.status(200).send({ comments });
    })
    .catch(next);
};
