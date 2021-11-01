const express = require("express");
const apiRouter = require("./routes/api.router");
const app = express();
// const { handle500, handleCustomErrors } = require("./errors/errors.controller");

app.use(express.json());

app.use("/api", apiRouter);

module.exports = app;
