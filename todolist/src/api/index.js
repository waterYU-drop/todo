import ajax from "./ajax";
const BASE_URL = "http://localhost:4002/api";

// 得到数据
export const requestData = (obj) => ajax(BASE_URL + "/getData", obj, "POST");
//add
export const addItem = (obj) => ajax(BASE_URL + "/addItem", obj, "POST");
//del
export const delItem = (obj) => ajax(BASE_URL + "/delItem", obj, "POST");
//修改
export const changeItem = (obj) =>
  ajax(BASE_URL + "/changeItem", obj, "POST");
