const commentsRouter = require("express").Router();
const {
  deleteComment,
  getAllComments,
} = require("../controllers/comments.controller");

commentsRouter.delete("/:comment_id", deleteComment);
commentsRouter.get("/", getAllComments);

module.exports = commentsRouter;
