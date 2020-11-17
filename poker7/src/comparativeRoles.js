const {
  RoyalShunzi,
  Shunzi,
  Four,
  Three,
} = require("./quote/ghostQuote");
const contrast = require("./quote/contrast");
const contrast2 = require("./quote/contrast2");
const findshunZi = require("./quote/findShunzi");
const find = require("./quote/findMax");
const Frequent = find.Frequent;
const pokerType = find.pokerType;

module.exports = comparativeRoles = (str) => {
  let pokerArr = str.split("");
  let pointArr = [];
  let colorArr = [];
  let point = [];
  let type, pai, theX;

  for (let i = 0; i < 14; i++) {
    if (i % 2 === 0) {
      pointArr.push(pokerArr[i]); // 牌型
    } else {
      colorArr.push(pokerArr[i]); // 花色
    }
  }
  let arr = [];
  for (let i = 0; i < 14; i++) {
    let Str = str.split("").slice(i, i + 2);
    arr.push(Str);
  }

  let c = Frequent(colorArr); //获取出现最多次数的花色
  //获取同花的牌面
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] == c.maxItem) {
      point.push(arr[i][0]);
    }
  }
  //判断是否同花
  if (c.maxCount >= 4) {
    if (pokerType(point, RoyalShunzi, 5)) {
      //皇家同花顺
      let complement = [
        ...pokerType(point, RoyalShunzi, 5)
          .split("")
          .filter((item) => !new Set("AJKQT".split("")).has(item)),
        ..."AJKQT"
          .split("")
          .filter(
            (item) =>
              !new Set(pokerType(point, RoyalShunzi, 5).split("")).has(item)
          ),
      ];
      pai = pokerType(point, RoyalShunzi, 5) + complement;
      type = 10;
      return { pai, type };
    }
    //同花顺
    if (findshunZi(point, Shunzi, 41)) {
      pai = findshunZi(point, Shunzi, 41);
      type = 9;
      return { pai, type };
    }
  }
  //不同花,先删除赖子
  pointArr.splice(pointArr.indexOf("X"), 1);
  //四条
  if (pokerType(pointArr, Four, 13)) {
    let theSame = pokerType(pointArr, Four, 13).split("");
    let obj = Frequent(pointArr);
    if (obj.maxCount === 4) {
      //牌里本身自带四条
      if (obj.maxItem == "A") {
        theX = "K"; //赖子赋值
      } else {
        theX = "A";
      }
      theSame.push(obj.maxItem);
      theSame.push(theX);
      pai = theSame.join("");
    } else {
      //本身是三条
      theX = obj.maxItem;
      pointArr.splice(pointArr.indexOf(obj.maxItem), 3);
      pointArr.splice(pointArr.indexOf(obj.maxItem), 1);
      let max =
        contrast2[pointArr.map((item) => contrast[item]).sort((a, b) => b - a)[0]]; //剩下的最大元素
      let arr = [theX, theX, theX, theX, max];
      pai = arr.join("");
    }
    type = 8;
    return { pai, type };
  }
  //三带二
  if (pokerType(pointArr, Three, 13)) {
    let maxpoint = pokerType(pointArr, Three, 13);
    theX = maxpoint.split("")[0];
    let complement = [
      ...maxpoint.split("").filter((item) => !new Set(pointArr).has(item)),
      ...pointArr.filter((item) => !new Set(maxpoint.split("")).has(item)),
    ];
    if (pokerType(complement, Three, 13)) {
      let cp = pokerType(complement, Three, 13).split("");
      pai = maxpoint + theX + cp[cp.length - 1] + cp[cp.length - 2];
      type = 7;
      return { pai, type };
    }
  }
  //同花
  if (c.maxCount >= 4) {
    pai = point
      .map((item) => contrast[item])
      .sort((a, b) => a - b)
      .map((item) => contrast2[item])
      .join("");
    let arrX = pai
      .split("")
      .map((item) => contrast[item])
      .reverse();
    if (arrX[0] !== 14) {
      theX = "A";
    } else {
      if (arrX[1] !== 13) {
        theX = "K";
      } else {
        if (arrX[2] !== 12) {
          theX = "Q";
        } else {
          theX = "J";
        }
      }
    }
    if (pai.length >= 4) {
      let len = pai.length;
      pai =
        pai
          .split("")
          .splice(len - 4, 4)
          .join("") + theX;
    }
    type = 6;
    return { pai, type };
  }
  //顺子
  if (findshunZi(pointArr, Shunzi, 41)) {
    pai = findshunZi(pointArr, Shunzi, 41);
    type = 5;
    return { pai, type };
  }
  //三条
  if (pokerType(pointArr, Three, 13)) {
    let maxpoint = pokerType(pointArr, Three, 13);
    theX = maxpoint.split("")[0];
    let complement = [
      ...maxpoint.split("").filter((item) => !new Set(pointArr).has(item)),
      ...pointArr.filter((item) => !new Set(maxpoint.split("")).has(item)),
    ];
    let cp = complement
      .map((item) => contrast[item])
      .sort((a, b) => a - b)
      .map((item) => contrast2[item]);
    pai = maxpoint + theX + cp[cp.length - 1] + cp[cp.length - 2];
    type = 4;
    return { pai, type };
  }
  // 一对
  pointArr = pointArr
    .map((item) => contrast[item])
    .sort((a, b) => a - b)
    .map((item) => contrast2[item])
    .reverse();
  theX = pointArr[0];
  let maxpoint = pointArr.splice(0, 4).join("") + theX;
  pai = maxpoint
    .split("")
    .map((item) => contrast[item])
    .sort((a, b) => a - b)
    .map((item) => contrast2[item])
    .join("");
  type = 2;
  return { pai, type };
};
