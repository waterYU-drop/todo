import React from 'react';
import {View, FlatList, Text} from 'react-native';
import Header from '../TodoItem/index';
import Item from '../TodoSum';
import store from '../../store/stateType';
import {getDataAction} from '../../store/reducer';
import {reqQueryData} from '../../api';
import {TODO} from '../../store/stateType';

export default class TodoInput extends React.Component<{}, TODO> {
  constructor(props: {}) {
    super(props);
    this.state = store.getState();
  }
  async _queryData() {
    let result;
    result = await reqQueryData();
    const action = getDataAction(result);
    store.dispatch(action);
  }
  render() {
    const todos = this.state.list;
    return (
      <View>
        <Header />
        <FlatList
          data={todos}
          renderItem={({item}) => <Item item={item} />}
          // keyExtractor={(item) => item.id.toString()}
        />
        <Text>{this.state.finished}accomplish</Text>
        <Text>{todos.length}sum</Text>
      </View>
    );
  }
  UNSAFE_componentWillMount() {
    this._queryData();
  }
  componentDidMount() {
    store.subscribe(this.handleInputChange);
  }
  handleInputChange = () => {
    this.setState(store.getState());
  };
}
