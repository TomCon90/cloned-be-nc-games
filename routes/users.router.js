const usersRouter = require("express").Router();
const users = require("../db/data/test-data/users");
const {
  getAllUsernames,
  getUserByUsernameId,
} = require("../controllers/users.controllers");

usersRouter.get("/", getAllUsernames);
usersRouter.get("/:username", getUserByUsernameId);

module.exports = usersRouter;
