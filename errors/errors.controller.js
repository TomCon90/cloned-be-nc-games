exports.handlePSQLErrors = (err, req, res, next) => {
  console.log(err);
  if (err.code === "23502") {
    res.status(400).send({ msg: "Empty object" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Incorrect ID format" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Incorrect input" });
  } else if (err.code === "42703") {
    res.status(404).send({ msg: "Limit or Page input not a number" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
