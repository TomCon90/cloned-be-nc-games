const { selectAllEndpoints } = require("../models/api.models");

exports.getAllEndpoints = (req, res, next) => {
  res.status(200).send(selectAllEndpoints());
};
