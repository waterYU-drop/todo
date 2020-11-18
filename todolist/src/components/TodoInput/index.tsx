import React from "react";
import "../../components/index.css";
import store from "../../store/stateType";
import { getAddItemAction } from "../../store/reducer";
import { addItem } from "../../api";
import { TODO, TODOITEM } from "../../store/stateType";

class TodoInput extends React.Component<{}, TODO> {
  constructor(props: {}) {
    super(props);
    this.state = store.getState();
  }
  componentDidMount() {
    store.subscribe(this.handleInputChange);
  }
  // 增加todo项
  addItem() {
    const mingzi = Math.random() * (100 + 1);
    let value = this.state.content;
    if (value !== "") {
      const obj = {
        id: mingzi,
        value: value,
        status: 0,
      };
      this._addItem(obj);
      this.setState({
        content: "",
      });
    }
  }
  // 键盘按下13
  onKeyDownchange(e: any) {
    if (e.keyCode === 13) {
      this.addItem();
    }
  }
  // input改变
  inputChange(e: any) {
    this.setState({
      content: e.target.value,
    });
  }
  render() {
    return (
      <div className="todoHeader">
        <input
          className="todoinput"
          type="text"
          value={this.state.content}
          placeholder="todo"
          onChange={(e) => this.inputChange(e)}
          onKeyDown={(e) => this.onKeyDownchange(e)}
        />
      </div>
    );

  } 
  // add = (payload: {
  //   number: number
  // }, state?: any) => {
  //   return {
  //     num: state.num + payload.number
  //   }
  // };

  // _add = function *() {
  //   yield console.log('啦啦啦');
  // };

 
  handleInputChange = () => {
    this.setState(store.getState());
  };
  async _addItem(obj: TODOITEM) {
    let result = await addItem(obj);
    if (result) {
      const action = getAddItemAction(obj);
      store.dispatch(action);
    }
  }
}
export default TodoInput;
