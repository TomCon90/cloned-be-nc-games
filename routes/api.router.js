const apiRouter = require("express").Router();
const usersRouter = require("./users.router");
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");

const { getAllEndpoints } = require("../controllers/api.controllers.js");

apiRouter.use("/users", usersRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/comments", commentsRouter);

// apiRouter.use("//", getAllEndpoints);

module.exports = apiRouter;
