// 两对大牌
// 找出一对的大牌进行比较
const contrast = require("../quote/contrast");
const compare = require("../quote/compare");

module.exports = cTwoPairs = (alice, bob) => {
  const TwoPairs = (arr) => {
    let repeatArr = [];
    arr.sort();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == arr[i + 1] && repeatArr.indexOf(arr[i]) == -1) {
        repeatArr.push(arr[i]);
        i++;
      }
    }
    // repeatArr查找重复元素
    return repeatArr;
  };

  let twiceA = TwoPairs(alice);
  let twiceB = TwoPairs(bob);
  const doubleA = twiceA.map((item) => contrast[item]).sort((a, b) => b - a);
  const doubleB = twiceB.map((item) => contrast[item]).sort((a, b) => b - a);
  let result = compare(doubleA, doubleB); //比较两对元素的大小
  if (result === 0) {
    alice.splice(alice.indexOf(twiceA[0] + ""), 2);
    alice.splice(alice.indexOf(twiceA[1] + ""), 2); //删除两对元素
    bob.splice(bob.indexOf(twiceB[0] + ""), 2);
    bob.splice(bob.indexOf(twiceB[1] + ""), 2);
    let result1 = compare(
      //比较剩下的一个元素的大小
      alice.map((item) => contrast[item]),
      bob.map((item) => contrast[item])
    );
    return result1;
  } else {
    return result;
  }
  
};

