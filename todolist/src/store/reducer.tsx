import { TODO, TODOITEM } from "./stateType";
// import { getData, addItem, deleteItem, changeItem } from "./types";

const defaultState:TODO = {
  todoli: [],
  checked: 0,
  content: "",
};

// export const getData = "get_data"; 
// export const addItem = "add_item"; 
// export const deleteItem = "delete_item"; 
// export const changeItem = "change_item";

// import { TODOITEM } from "./stateType";

export const GET_TODO = 'GET_TODO';//获取数据
export const ADD_TODO = 'ADD_TODO';//添加
export const DELETEITEM_TODO = 'DELETEITEM_TODO';//删除
export const COMPLETED_TODOS = 'COMPLETED_TODOS'; //修改状态



// import { getData, addItem, deleteItem, changeItem } from "./types";

export function getDataAction(item: TODOITEM) {
  return {
    type: GET_TODO,
    item,
  };
}
export function getAddItemAction(item: TODOITEM) {
  return {
    type: ADD_TODO,
    item,
  };
}
export function getChangeItemAction(id: Number) {
  return {
    type: DELETEITEM_TODO,
    id,
  };
}
export function getDeleteItemAction(id: number) {
  return {
    type: COMPLETED_TODOS,
    id,
  };
}

// 状态 调用
const reducer = (state: TODO = defaultState, action: any) => {
  if(action.type === GET_TODO){
      const newState=Object.assign({},state);
      newState.todoli = action.item;
      let todochecked = 0;
      newState.todoli.forEach((todo: TODOITEM) => {
        if (todo.status) {
          todochecked += 1;
        }
      });
      newState.checked = todochecked;
      return newState;
  }else if(action.type === ADD_TODO){
    const newState=Object.assign({},state);
      newState.todoli.push(action.item);
      return newState;
  }else if(action.type === COMPLETED_TODOS){
         const newState=Object.assign({},state);
      let todochecked = 0;
      newState.todoli.forEach((todo: TODOITEM, index: number) => {
        if (action.id === todo.id) {
          newState.todoli.splice(index, 1);
        }
      });
      newState.todoli.forEach((todo: TODOITEM) => {
        if (todo.status) {
          todochecked += 1;
        }
      });
      newState.checked = todochecked;
      return newState;
  }else if(action.type === DELETEITEM_TODO){
      const newState=Object.assign({},state);
      let todochecked = 0;
      newState.todoli.forEach((todo: TODOITEM) => {
        if (action.id === todo.id) {
          todo.status = todo.status === 1 ? 0 : 1;
        }
        if (todo.status) {
          todochecked += 1;
        }
      });
      newState.checked = todochecked;
      return newState;
  }else {
     return state;
  }
};
export default reducer;