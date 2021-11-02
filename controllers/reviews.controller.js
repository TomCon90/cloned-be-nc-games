const { selectAllReviewsByID } = require("../models/reviews.models");

exports.getAllReviewsByID = (req, res, next) => {
  const { id } = req.params;
  selectAllReviewsByID(id).then((review) => {
    res.status(200).send({ review });
  });
};
