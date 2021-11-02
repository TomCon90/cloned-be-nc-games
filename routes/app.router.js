const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");

apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;
