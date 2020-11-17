import {createStore} from 'redux';
import reducers from './reducer';
export interface TODO {
  list: {
    id: number;
    content: string;
    status: number;
  }[];
  finished: number;
  input_value: string;
}

export interface TODOITEM {
  id: number;
  content: string;
  status: number;
}
//TODOITEM TODO

const store = createStore(reducers);
export default store;
