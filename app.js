const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api.router");
const app = express();
const {
  handle500,
  handleCustomErrors,
  handlePSQLErrors,
} = require("./errors/errors.controller");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use(handle500);

module.exports = app;
