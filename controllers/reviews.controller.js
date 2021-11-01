const { selectAllReviewsByID } = require("../models/reviews.models");

exports.getAllReviewsByID = (req, res, next) => {
  console.log("in getallreviewsbyid");
  const { id } = req.params;
  selectAllReviewsByID(id).then((category) => {
    res.status(200).send({ category });
  });
};
