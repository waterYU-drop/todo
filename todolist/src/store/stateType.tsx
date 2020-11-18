import { createStore } from "redux";
import reducers from "./reducer";

export interface TODO {
  todoli: {
    id: number;
    value: string;
    status: number;
  }[];
  checked: number;
  content: string;
}

export interface TODOITEM {
  id: number;
  value: string;
  status: number;
}


const store = createStore(reducers);
export default store;


//TODOITEM  TODO