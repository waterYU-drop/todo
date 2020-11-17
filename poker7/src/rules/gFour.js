// 四条 其中四张是相同点数但不同花的扑克牌，第五张是随意的一张牌 
const contrast = require("../quote/contrast");

module.exports = gFour = (alice, bob) => {
  const four = (arr) => {
    const map = {};
    for (const num of arr) {
      if (!map[num]) {
        map[num] = true;
      } else {
        return num;
      }
    }
  };
  const twice1 = four(alice);
  const twice2 = four(bob);
  if (twice1 === twice2) {
    alice.splice(alice.indexOf(twice1), 4);
    bob.splice(bob.indexOf(twice2), 4);
    let result1 = alice.map((item) => contrast[item]).join("");
    let result2 = bob.map((item) => contrast[item]).join("");
    let result = Number(result1) - Number(result2);
    if (result > 0) {
      return 1;
    } else if (result < 0) {
      return 2;
    } else {
      return 0;
    }
  } else {
    const result = contrast[twice1] > contrast[twice2] ? 1 : 2;
    return result;
  }
};