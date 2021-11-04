const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");
const { getAllEndpoints } = require("../controllers/api.controllers.js");

apiRouter.use("/", getAllEndpoints);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
