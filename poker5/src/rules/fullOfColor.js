// 满堂彩（葫芦，三带二） 由三张相同点数及任何两张其他相同点数的扑克牌组成 
const contrast = require("../quote/contrast");

module.exports = fullOfColor = (alice, bob) => {
    // 获取三张相同的牌
    const three = (arr) => {
      let maxCount = 0,
        maxItem = "",
        max = {};
      arr.forEach((item) => {
        max[item] ? (max[item].count += 1) : (max[item] = { count: 1 });
        max[item].count > maxCount &&((maxCount = max[item].count), (maxItem = item));
      });
      return maxItem;
    };

    // 比较这三张牌的大小
    const Three1 = three(alice);
    const Three2 = three(bob);

    // 三张牌相等比较两张剩下的相同的
    if (Three1 === Three2) {
      alice.splice(alice.sort().indexOf(Three1), 3);
      bob.splice(bob.sort().indexOf(Three2), 3);
    // 去掉前三张
      if (contrast[alice[0]] > contrast[bob[0]]) {
        return 1;
      } else if (contrast[alice[0]] < contrast[bob[0]]) {
        return 2;
      } else {
        return 0;
      }
    } else if (contrast[Three1] > contrast[Three2]) {
      return 1;
    } else {
      return 2;
    }
  };
  