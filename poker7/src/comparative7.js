// 判断七张牌
const { Shunzi, Four, Three, Pair } = require("./quote/SevenQuote");
const contrast = require("./quote/contrast");
const contrast2 = require("./quote/contrast2");
const find = require("./quote/findMax");
const Frequent = find.Frequent;
const pokerType = find.pokerType;

module.exports = comparative7 = (str) => {
  let pokerArr = str.split("");
  let pointArr = [];
  let colorArr = [];
  let point = [];
  let type, pai;

  for (let i = 0; i < 14; i++) {
    if (i % 2 === 0) {
     // 前一张点数
      pointArr.push(pokerArr[i]);
    } else {
    // 后一张花色
      colorArr.push(pokerArr[i]); 
    }
  }
  let arr = [];
  for (let i = 0; i < 14; i++) {
    let Str = str.split("").slice(i, i + 2);
    arr.push(Str);
  }

  // 排序
  let numpoint = pointArr
    .map((item) => contrast[item])
    .sort((a, b) => a - b)
    .join(" ");

    // 先判断花色
  // 得到出现最多花色的牌
  
  let c = Frequent(colorArr); 
  //判断是否同花
  if (c.maxCount >= 5) {
    //获取同花的牌面
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][1] == c.maxItem) {
        point.push(arr[i][0]);
      }
    }
    
  //皇家同花顺  顺子是不是等于AJKQT
    if (pokerType(point, Shunzi, 10) === "AJKQT") {
      pai = pokerType(point, Shunzi, 10);
      type = 10;
      return { pai, type }; 
    } else {
      //判断是不是同花顺
      if (pokerType(point, Shunzi, 10)) {
        pai = pokerType(point, Shunzi, 10);
        type = 9;
        return { pai, type };
      }
    }
    // 同花 七张里面选取五张
    if (c.maxCount >= 5) {
      pai = point.map((item) => contrast[item]).sort((a, b) => a - b)
      .map((item) => contrast2[item]).join("");
      if (pai.length > 5) {
        pai = pai.split("").splice(1, 5).join("");
      }
      type = 6;
      return { pai, type };
    }
  } else {
    //判断是不是四条
    if (pokerType(pointArr, Four, 13)) {
      pai = pokerType(pointArr, Four, 13);
      let complement = [
        ...pai.split("").filter((item) => !new Set(pointArr).has(item)),
        ...pointArr.filter((item) => !new Set(pai.split("")).has(item)),
      ];
      pai =
        pai +
        complement
          .map((item) => contrast[item])
          .sort((a, b) => a - b)
          .map((item) => contrast2[item])
          .reverse()[0];
      type = 8;
      return { pai, type };
    }
    //三带二
    if (pokerType(pointArr, Three, 13)) {
      let three = pokerType(pointArr, Three, 13)[0]
        .split("")
        .map((item) => contrast[item])
        .sort((a, b) => a - b)
        .join("");
      let threeFlag = three + " " + three;
      let matchType = [];
      for (let i = 0; i < 13; i++) {
        if (numpoint.includes(Pair[i])) {
          matchType.push(Pair[i]);
        }
      }
      for (let i = matchType.length - 1; i >= 0; i--) {
        if (!(matchType[i] === threeFlag)) {
          pai =
            pokerType(pointArr, Three, 13) +
            matchType[i]
              .split(" ")
              .map((item) => contrast2[item])
              .sort()
              .join("");
          type = 7;
          return { pai, type };
        }
      }
    }
    //顺子
    if (pokerType([...new Set(pointArr)], Shunzi, 10)) {
      pai = pokerType([...new Set(pointArr)], Shunzi, 10);
      type = 5;
      return { pai, type };
    } else {
      if (
        [...new Set(pointArr.sort())].join("").includes("2345") &&
        pointArr.sort().join("").includes("A")
      ) {
        pai = "2345A";
        type = 5;
        return { pai, type };
      }
    }
  }
  //三条
  if (pokerType(pointArr, Three, 13)) {
    let threepoint = pokerType(pointArr, Three, 13);
    let Pairpoint = [];
    let threeFlag = Number(
      pokerType(pointArr, Three, 13)[0]
        .split("")
        .map((item) => contrast[item])
        .sort((a, b) => a - b)
        .join("")
    );
    pointArr = [
      ...new Set(pointArr.map((item) => contrast[item]).sort((a, b) => a - b)),
    ];
    for (let i = pointArr.length - 1; i >= 0; i--) {
      if (!(pointArr[i] === threeFlag)) {
        if (Pairpoint.length < 2) {
          Pairpoint.unshift(String(pointArr[i]));
        }
      }
    }
    Pairpoint = Pairpoint.map((item) => Number(item)).map(
      (item) => contrast2[item]
    );
    pai = threepoint + Pairpoint[1] + Pairpoint[0];
    type = 4;
    return { pai, type };
  }
  //俩对
  if (pokerType(pointArr, Pair, 13)) {
    let matchType = [];
    for (let i = 0; i < 13; i++) {
      if (numpoint.includes(Pair[i])) {
        matchType.push(Pair[i]);
      }
    }
    if (matchType.length >= 2) {
      let firstPair = matchType[matchType.length - 1]
        .split(" ")
        .map((item) => contrast2[item])
        .sort()
        .join("");
      let firstFlag = firstPair[0];
      let secondPair = matchType[matchType.length - 2]
        .split(" ")
        .map((item) => contrast2[item])
        .sort()
        .join("");
      let secondFlag = secondPair[0];
      let otherArr = [];
      for (let i = 0; i < pointArr.length; i++) {
        if (pointArr[i] !== firstFlag && pointArr[i] !== secondFlag) {
          otherArr.push(pointArr[i]);
        }
      }
      otherArr = otherArr
        .map((item) => contrast[item])
        .sort((a, b) => a - b)
        .splice(1, 2)
        .map((item) => contrast2[item]);
      pai = firstPair + secondPair + otherArr[1];
      type = 3;
      return { pai, type };
    }
  }
  //一对
  if (pokerType(pointArr, Pair, 13)) {
    let matchType = [];
    for (let i = 0; i < 13; i++) {
      if (numpoint.includes(Pair[i])) {
        matchType.push(Pair[i]);
      }
    }
    let firstPair = matchType[matchType.length - 1]
      .split(" ")
      .map((item) => contrast2[item])
      .sort()
      .join("");
    let firstFlag = firstPair[0];
    let otherArr = [];
    for (let i = 0; i < pointArr.length; i++) {
      if (pointArr[i] !== firstFlag) {
        otherArr.push(pointArr[i]);
      }
    }
    otherArr = otherArr
      .map((item) => contrast[item])
      .sort((a, b) => a - b)
      .map((item) => contrast2[item]);
    pai = firstPair + otherArr[4] + otherArr[3] + otherArr[2];
    type = 2;
    return { pai, type };
  } else {
    //单张大牌
    pai = pointArr
      .map((item) => contrast[item])
      .sort((a, b) => a - b)
      .splice(2, 5)
      .map((item) => contrast2[item])
      .join("");
    type = 1;
    return { pai, type };
  }
};
