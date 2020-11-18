// 满堂彩（葫芦，三带二） 由三张相同点数及任何两张其他相同点数的扑克牌组成
const contrast = require("../quote/contrast");
const find = require("../quote/findMax");
const Frequent = find.Frequent;

module.exports = fullOfColor = (alice, bob) => {
  // console.log(alice, bob);
  // 获取三张相同的牌
  const ThreeA = Frequent(alice);
  const ThreeB = Frequent(bob); //获取三条元素
  console.log(ThreeA);
  if (ThreeA.maxItem === ThreeB.maxItem) {
    alice.splice(alice.sort().indexOf(ThreeA.maxItem), 3);
    bob.splice(bob.sort().indexOf(ThreeB.maxItem), 3);
    if (contrast[alice[0]] > contrast[bob[0]]) {
      //比较两对的的大小
      return 1;
    } else if (contrast[alice[0]] < contrast[bob[0]]) {
      return 2;
    } else {
      return 0;
    }
  } else if (contrast[ThreeA.maxItem] > contrast[ThreeB.maxItem]) {
    return 1;
  } else {
    return 2;
  }
};
