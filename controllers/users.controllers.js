const { selectAllUsernames } = require("../models/users.models");

exports.getAllUsernames = (req, res, next) => {
  selectAllUsernames()
    .then((usernames) => res.status(200).send(usernames))
    .catch(next);
};
