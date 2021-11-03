const {
  removeComment,
  selectAllComments,
} = require("../models/comments.models");

exports.getAllComments = (req, res, next) => {
  selectAllComments().then((comments) => {
    res.status(200).send({ comments });
  });
};

exports.deleteComment = (req, res, next) => {
  removeComment();
};
