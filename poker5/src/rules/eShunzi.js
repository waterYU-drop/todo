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
    // 直接比
    let arr1 = a.split("");
    let arr2 = b.split("");
    let result = contrast[arr1[4]] > contrast[arr2[4]] ? 1 : 2;
    return result;
  }
};
