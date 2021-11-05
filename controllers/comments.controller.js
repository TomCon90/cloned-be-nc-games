const {
  removeComment,
  selectAllComments,
  patchCommentsByID,
} = require("../models/comments.models");

exports.getAllComments = (req, res, next) => {
  selectAllComments()
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comments_id } = req.params;
  removeComment(comments_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.updateCommentsByID = (req, res, next) => {
  const { comments_id } = req.params;
  const { inc_votes } = req.body;
  patchCommentsByID(comments_id, inc_votes)
    .then((comment) => {
      res.status(200).send(comment);
    })
    .catch(next);
};
