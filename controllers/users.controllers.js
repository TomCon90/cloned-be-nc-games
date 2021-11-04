const {
  selectAllUsernames,
  selectUserByUsernameId,
} = require("../models/users.models");

exports.getAllUsernames = (req, res, next) => {
  selectAllUsernames()
    .then((usernames) => res.status(200).send(usernames))
    .catch(next);
};

exports.getUserByUsernameId = (req, res, next) => {
  const username_id = req.params;
  selectUserByUsernameId(username_id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};
