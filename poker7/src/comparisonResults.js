const aSingleBig = require('./rules/aSingleBig')
const bAPair = require('./rules/bAPair')
const cTwoPairs = require('./rules/cTwoPairs')
const dThree = require('./rules/dThree')
const eShunzi = require('./rules/eShunzi')
const fullOfColor = require('./rules/fullOfColor')
const gFour = require('./rules/gFour')

// 判断结果
module.exports = comparisonResults = (alice, bob, alicetype) => {
  let Alice, Bob;
  if (alice.length === 5) {
    Alice = alice.split("");
    Bob = bob.split("");
  } else {
    Alice = alice.split("").filter((item, index) => index % 2 === 0);
    Bob = bob.split("").filter((item, index) => index % 2 === 0);
  }
    switch (alicetype) {
      case 9:
        return eShunzi(Alice, Bob);
      case 8:
        return gFour(Alice, Bob);
      case 7:
        return fullOfColor(Alice, Bob);
      case 6:
        return aSingleBig(Alice, Bob);
      case 5:
        return eShunzi(Alice, Bob);
      case 4:
        return dThree(Alice, Bob);
      case 3:
        return cTwoPairs(Alice, Bob);
      case 2:
        return bAPair(Alice, Bob);
      case 1:
        return aSingleBig(Alice, Bob);
      default:
        return 0;
    }
  };
  