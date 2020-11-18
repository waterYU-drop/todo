// 找出一对的大牌进行比较
const contrast = require("../quote/contrast");
const compare = require("../quote/compare");

module.exports = bAPairs = (alice, bob) => {
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
  // 得到一对

  if (twiceA === twiceB) {
    alice.splice(alice.sort().indexOf(twiceA), 2);
    bob.splice(bob.sort().indexOf(twiceB), 2);
    // 去掉这一对再次 比较
    let result1 = alice.map((item) => contrast[item]).sort((a, b) => b - a);
    let result2 = bob.map((item) => contrast[item]).sort((a, b) => b - a);
    let result = compare(result1, result2);
    return result;
  } else {
    // 这一对不一样直接比较大小
    const result = contrast[twiceA] > contrast[twiceB] ? 1 : 2;
    return result;
  }
  
};
