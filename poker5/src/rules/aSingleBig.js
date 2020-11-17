// 比较单张大牌
const contrast = require('../quote/contrast');
const compare = require("../quote/compare");

module.exports = aSingleBig = (alice, bob) => {
  // 遍历排序
    let result1 = alice.map((item) => contrast[item]).sort((a, b) => b - a);
    let result2 = bob.map((item) => contrast[item]).sort((a, b) => b - a);
    let result = compare(result1, result2);
    return result;
  };

// 同花 此牌由五张不按顺序但相同花的扑克牌组成 本质都是比较最大一张牌