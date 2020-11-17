// 三条  由三张相同点数和两张不同点数的扑克组成 

const contrast = require("../quote/contrast");
const compare = require("../quote/compare");

module.exports = dThree = (alice, bob) => {
    const APairs = (arr) => {
        const map = {};
        for (const num of arr) {
          if (!map[num]) {
            map[num] = true;
          } else {
            return num;
          }
        }
      };
      // 提取重复元素

  const twiceA = APairs(alice);
  const twiceB = APairs(bob);
  if (twiceA === twiceB) {
    // 如果三个数相等 把他取出比较剩下两个
    alice.splice(alice.sort().indexOf(twiceA), 3);
    bob.splice(bob.sort().indexOf(twiceB), 3);
    let result1 = alice.map((item) => contrast[item]).sort((a, b) => b - a);
    let result2 = bob.map((item) => contrast[item]).sort((a, b) => b - a);
    let result = compare(result1, result2);
    return result;
  } else {
    const result = contrast[twiceA] > contrast[twiceB] ? 1 : 2;
    return result;
  }
};
