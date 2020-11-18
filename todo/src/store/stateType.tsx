import {createStore} from 'redux';
import reducers from './reducer';
export interface TODO {
  list: {
    id: number;
    value: string;
    status: number;
  }[];
  finished: number;
  content: string;
}

export interface TODOITEM {
  id: number;
  value: string;
  status: number;
}
//TODOITEM TODO

const store = createStore(reducers);
export default store;
