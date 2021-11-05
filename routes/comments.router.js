const commentsRouter = require("express").Router();
const {
  deleteComment,
  getAllComments,
  updateCommentsByID,
} = require("../controllers/comments.controller");
const comments = require("../db/data/test-data/comments");

commentsRouter
  .route("/:comments_id")
  .delete(deleteComment)
  .patch(updateCommentsByID);

commentsRouter.get("/", getAllComments);

module.exports = commentsRouter;
