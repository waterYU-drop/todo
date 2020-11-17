import React from "react";
import TodoItem from "../TodoItem/index";
import TodoInput from "../TodoInput/index";
import store from "../../store/stateType";
import { requestData } from "../../api/index";
import { getDataAction } from "../../store/reducer";
import { TODO, TODOITEM } from "../../store/stateType";

class TodoSum extends React.Component<{}, TODO> {
  constructor(props: {}) {
    super(props);
    this.state = store.getState();
  }

  async _queryData() {
    let result;
    result = await requestData();
    const action = getDataAction(result);
    store.dispatch(action);
  }
  render() {
    const todos = this.state.todoli;
    return (
      <div>
        <TodoInput />
        <ul>
          {todos.map((item: TODOITEM, index: number) => (
            <TodoItem item={item} key={index} />
          ))}
          <li className="todocheck">
          accomplish{this.state.checked}
          </li>
          <li className="todocheck">
            sum{todos.length}
          </li>
        </ul>
      </div>
    );
  } 
  componentWillMount() {
    this._queryData();
  }
  componentDidMount() {
    store.subscribe(this.handleInputChange);
  }
  handleInputChange = () => {
    this.setState(store.getState());
  };
}

export default TodoSum;
