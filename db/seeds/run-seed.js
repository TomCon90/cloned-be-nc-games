const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const db = require("../../db/index");

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
