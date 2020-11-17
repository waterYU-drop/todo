import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import store from '../../store/stateType';
import {getChangeItemAction, getDeleteItemAction} from '../../store/reducer';
import {TODO, TODOITEM} from '../../store/stateType';
import {reqChangeTodo, reqDelTodo} from '../../api';

export default class TodoSum extends React.Component<any, TODO> {
  constructor(props: {}) {
    super(props);
    this.state = store.getState();
  }
  componentDidMount() {
    store.subscribe(this.handleInputChange);
  }
  handleInputChange = () => {
    this.setState(store.getState());
  };
  async finishItem(item: TODOITEM) {
    let result;
    const obj = {
      id: item.id,
      status: item.status,
    };
    result = await reqChangeTodo(obj);
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
    result = await reqDelTodo(obj);
    if (result) {
      const action = getDeleteItemAction(item.id);
      store.dispatch(action);
    }
  }
  render() {
    const {item} = this.props;
    const unfinish = {
      backgroundColor: '#0066FF',
      color: '#333',
    };
    const finish = {
      backgroundColor: 'pink',
      color: '#666',
    };
    const itemStyle = item.status === 0 ? unfinish : finish;
    return (
      <View style={[itemStyle, styles.container]}>
        <Text
          onPress={() => this.finishItem(item)}
          style={[
            styles.checkBox, // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: item.status === 0 ? 'pink' : '#0066FF',
            },
          ]}
        />
        <Text
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              textDecorationLine: item.status ? 'line-through' : 'none',
            },
            styles.box,
          ]}>
          {item.content}
        </Text>
        <Text onPress={() => this.deleteItem(item)}>X</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    height: 20,
    marginTop: 10,
  },
  box: {
    position: 'relative',
    paddingRight: 10,
    width: 330,
    marginLeft: 20,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 300,
    borderWidth: 2,
    borderColor: '#0066FF',
  },
});
