const aSingleBig = require('./rules/aSingleBig')
const bAPair = require('./rules/bAPair')
const cTwoPairs = require('./rules/cTwoPairs')
const dThree = require('./rules/dThree')
const eShunzi = require('./rules/eShunzi')
const fullOfColor = require('./rules/fullOfColor')
const gFour = require('./rules/gFour')

// 判断结果
module.exports = comparisonResults = (alice, bob, alicetype) => {
    const Alice = alice.split("").filter((item, index) => index % 2 === 0);
    const Bob = bob.split("").filter((item, index) => index % 2 === 0);
    if (alicetype === 9) {
        return eShunzi(Alice, Bob);
    } else if (alicetype === 8) {
        return gFour(Alice, Bob);
    } else if (alicetype === 7) {
        return fullOfColor(Alice, Bob);
    } else if (alicetype === 6) {
        return aSingleBig(Alice, Bob);
    } else if (alicetype === 5) {
        return eShunzi(Alice, Bob);
    } else if (alicetype === 4) {
        return dThree(Alice, Bob);
    } else if (alicetype === 3) {
        return cTwoPairs(Alice, Bob);
    } else if (alicetype === 2) {
        return bAPair(Alice, Bob);
    } else if (alicetype === 1) {
        return aSingleBig(Alice, Bob);
    } else {
        return 0;
    }
};