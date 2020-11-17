// [{"alice":"5d6dJcJh7d","bob":"Js7cKdKh3c","result":2} 
const type = require("./quote/cite");
const Shunzi = type.Shunzi;
const Four = type.Four;
const Three = type.Three;
const Pair = type.Pair;


module.exports = comparativeRoles = (str) => {
  let arr = str.split("");
  // 点数 表示arr数组里面index能整除2的所有元素返回的数组
  let point = arr
    .filter((item, index) => index % 2 === 0)
    .sort()
    .join("");
    // 花色

  // 数组去重 顺子为花色情况下
  let decor = [...new Set(arr.filter((item, index) => index % 2))].join("");
  if (decor.length === 1) {
    if (Shunzi.includes(point)) {
     //皇家同花顺 点数是AKQJT
      if (point == "AKQJT") {
        return 10; 
      }
      // 同花顺 点数也是顺子
      return 9; 
    }
    // 同花
    return 6; 
   
  }

  // 顺子为点数情况下
  if (Shunzi.includes(point)) {
    return 5; //顺子
  }
  
  //是不是四张牌相同
  if (
    Four.filter((item) => point.indexOf(item) != -1).length 
  ) {
    return 8; //四条
  }

  // 是不是三张牌相同
  if (Three.filter((item) => point.indexOf(item) != -1).length) {
    //判断是否为三条
    let three = Three.filter(
      (item) => point.indexOf(item) != -1 
    );
    // 除去三张相同的牌比大小
    let otherpoint = point.replace(three[0], "");
    if (Pair.filter((item) => otherpoint.indexOf(item) != -1).length) {
      //剩下两张牌是一对 满堂彩
      if (!three[0].includes(otherpoint)) {
        return 7;
      }
    }
    // 不是一对 三条
    return 4;
  }

  // 是不是两张牌相同
  if (Pair.filter((item) => point.indexOf(item) != -1).length) {
    if (
      // 除了一对还有没有一对
      Pair.filter((item) => point.indexOf(item) != -1).length === 2 
    ) {
      return 3; //两对
    }
    return 2; //一对
  }
  return 1; //一对都没有直接比大小
  };
  