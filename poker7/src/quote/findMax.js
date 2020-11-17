const pokerType = (arr, faceType, len) => {
  let max;
  let numFace = arr
    .map((item) => contrast[item])
    .sort((a, b) => a - b)
    .join(" ");

    // 排序 
  let matchType = []; 
  for (let i = 0; i < len; i++) {
    if (numFace.includes(faceType[i])) {
      matchType.push(faceType[i]);
    }
  }
  //去重 建立新数组
  if (matchType.length === 0) {
    return false;
  } else {
    max = matchType[matchType.length - 1];
    return max
      .split(" ")
      .map((item) => contrast2[item])
      .sort()
      .join(""); 
  }
  // 转化找出最大数
};

const Frequent = (arr) => {
  let maxCount = 0,
    maxItem = "",
    obj = {};
  arr.forEach((item) => {
    obj[item] ? (obj[item].count += 1) : (obj[item] = { count: 1 });
    obj[item].count > maxCount &&
      ((maxCount = obj[item].count), (maxItem = item));
  });
  return { maxItem, maxCount };
  // 最常出现
};

module.exports.pokerType = pokerType;
module.exports.Frequent = Frequent;
