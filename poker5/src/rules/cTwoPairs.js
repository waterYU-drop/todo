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

  // 比较两对
  const twiceA = TwoPairs(alice).map((item) => contrast[item]).sort((a, b) => b - a);
  const twiceB = TwoPairs(bob).map((item) => contrast[item]).sort((a, b) => b - a);
  let result = compare(twiceA, twiceB);
  

  // 剩下
  if (result === 0) {
    let a = alice.splice(alice.sort().indexOf(twiceA[0]), 2).splice(alice.sort().indexOf(twiceA[1]), 2);
    let b = bob.splice(bob.sort().indexOf(twiceB[0]), 2).splice(bob.sort().indexOf(twiceB[1]), 2);
    let result1 = compare(
      a.map((item) => contrast[item]),
      b.map((item) => contrast[item])
    );
    return result1;
  } else {
    return result;
  }
};

