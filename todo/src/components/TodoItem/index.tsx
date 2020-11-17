import React from 'react';
import {View, Button, TextInput} from 'react-native';
import store from '../../store/stateType';
import {getAddItemAction} from '../../store/reducer';
import {reqAddTodo} from '../../api';
import {TODO, TODOITEM} from '../../store/stateType';

export default class TodoItem extends React.Component<{}, TODO> {
  constructor(props: {}) {
    super(props);
    this.state = store.getState();
  }
  async _addTodo(obj: TODOITEM) {
    let result = await reqAddTodo(obj);
    if (result) {
      const action = getAddItemAction(obj);
      store.dispatch(action);
    }
  }
  addTodo() {
    let value = this.state.input_value;
    const len = Math.random() * (100 + 1);
    if (value !== '') {
      const obj = {
        id: len,
        content: value,
        status: 0,
      };
      this._addTodo(obj);
      this.setState({
        input_value: '',
      });
    }
  }
  componentDidMount() {
    store.subscribe(this.handleInputChange);
  }
  handleInputChange = () => {
    this.setState(store.getState());
  };
  render() {
    return (
      <View>
        <TextInput
          placeholder="todo"
          onChangeText={(value: any) => {
            this.setState({
              input_value: value,
            });
          }}
          value={this.state.input_value}
        />
        <Button
          title="add"
          onPress={() => {
            this.addTodo();
          }}
        />
      </View>
    );
  }
}
