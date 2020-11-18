// 顺子 此牌由五张顺序扑克牌组成。
const contrast = require("../quote/contrast");

module.exports = eShunzi = (alice, bob) => {
  let a = alice.sort().join("");
  let b = bob.sort().join("");
  if (a === b) {
    return 0;
  } else if (a == "2345A" && b !== "2345A") {
    // a更小bob赢
    return 2;
  } else if (a !== "2345A" && b == "2345A") {
    return 1;
  } else {
    let arrA = a
      .split("")
      .map((item) => contrast[item])
      .sort((a, b) => b - a);
    let arrB = b
      .split("")
      .map((item) => contrast[item])
      .sort((a, b) => b - a);
    let result = arrA[0] > arrB[0] ? 1 : 2; //比较顺子的最大元素
    return result;
  }
};
