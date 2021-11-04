const usersRouter = require("express").Router();
const users = require("../db/data/test-data/users");
const { getAllUsernames } = require("../controllers/users.controllers");

usersRouter.get("/", getAllUsernames);

module.exports = usersRouter;
