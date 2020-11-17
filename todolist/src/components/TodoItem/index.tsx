import React from "react";
import "../index.css";
import PropTypes from "prop-types";
import store from "../../store/stateType";
import { getChangeItemAction, getDeleteItemAction } from "../../store/reducer";
import { TODO, TODOITEM } from "../../store/stateType";
import { changeItem, delItem } from "../../api";

class TodoItem extends React.Component<any, TODO> {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  async finishItem(item: TODOITEM) {
    let result;
    const obj = {
      id: item.id,
      status: item.status,
    };
    result = await changeItem(obj);
    console.log(result);
    if (result) {
      const action = getChangeItemAction(item.id);
      store.dispatch(action);
    }
  }
  async deleteItem(item: TODOITEM) {
    let result;
    const obj = {
      id: item.id,
    };
    result = await delItem(obj);
    if (result) {
      const action = getDeleteItemAction(item.id);
      store.dispatch(action);
    }
  }
  render() {
    
    const item = this.props.item;
    const unfinish = {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      color: "#333",
    };
    const finish = {
      backgroundColor: "pink",
      color: "#666",
      textDecoration: "line-through",
    };
    const itemStyle = item.status === 0 ? unfinish : finish;

    return (
      <div className="theList">
        <li key={item.id} style={itemStyle}>
          <input type="checkbox"
            className='check-btn'
            id={item.id}
            onClick={() => this.finishItem(item)}
          ></input>
          <span>{item.content}</span>
          <button onClick={() => this.deleteItem(item)} className='delete-btn'>
            x
          </button>
        </li>
      </div>
    );
  }  
  componentDidMount() {
    store.subscribe(this.handleInputChange);
  }
   handleInputChange = () => {
    this.setState(store.getState());
  };
}



export default TodoItem;
