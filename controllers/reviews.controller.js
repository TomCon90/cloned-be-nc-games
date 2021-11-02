const {
  selectAllReviewsByID,
  patchReviewsByID,
} = require("../models/reviews.models");

exports.getAllReviewsByID = (req, res, next) => {
  const { id } = req.params;
  selectAllReviewsByID(id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateReviewsByID = (req, res, next) => {
  const { id } = req.params;
  const { inc_votes } = req.body;

  console.log("inside update reviews by ID");
  patchReviewsByID(id, inc_votes).then((review) => {
    console.log(review);
    res.status(200).send({ review });
  });
};
