const math = require("mathjs");
const jumplings = require("./data");

function getRandom() {
  return math.randomInt(0, jumplings.length);
}

module.exports = getRandom;
