import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Header from '../components/TodoItem/index';
import Item from '../components/TodoSum';
// 使用import语句来引入React以及React Native的Text组件
import {FlatList, Text, View} from 'react-native';
import {TODO} from '../store/stateType';
// Enzyme.configure({ adapter: new Adapter() })

// describe('Enzyme shallow的浅渲染（Shallow Rendering）中', function () {
//   it('Example组件中按钮的名字为子组件Sub中span的值', function () {
//     const name='按钮名'
//     let app = shallow(<Example text={name} />)
//     const buttonObj=app.find('button')
//     const spanObj=app.find('span')

//     console.info(`查找到button的个数：${buttonObj.length}`)
//     console.info(`查找到span的个数：${spanObj.length}`)

//     assert.equal(buttonObj.text(),spanObj.text())
//   })
// })

describe('Enzyme Shallow', () => {
  it('TodoHeaderShow', () => {
    let header = shallow(<Header />);
    // eslint-disable-next-line jest/valid-expect
    expect(header.find('View').children().length).to.equal(2);
  });
  it('addTodo', () => {
    const defaultState: TODO = {
      list: [
        {
          id: 0,
          content: 'todo1',
          status: 0,
        },
        {
          id: 1,
          content: 'todo2',
          status: 0,
        },
        {
          id: 2,
          content: 'todo3',
          status: 0,
        },
      ],
      finished: 0,
      input_value: '',
    };
    let todoHeader = shallow(<Header />);
    const todo = {
      id: 3,
      content: 'todo4',
      status: 0,
    };
    let todoLength = defaultState.list.length;
    todoHeader.find('Button').simulate('click');
    // 添加数据
    defaultState.list.push(todo);
    let todolist = shallow(
      <View>
        <FlatList
          data={defaultState.list}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>,
    );
    //有无显示
    // expect(ul.children()).to.have.lengthOf(todoLength + 1);
    // eslint-disable-next-line jest/valid-expect
    expect(todolist.find('View').props().children.props.data.length).to.equal(
      todoLength + 1,
    );
  });
  it('delTodo', () => {
    const defaultState: TODO = {
      list: [
        {
          id: 0,
          content: 'todo1',
          status: 0,
        },
        {
          id: 1,
          content: 'todo2',
          status: 0,
        },
      ],
      finished: 0,
      input_value: '',
    };
    let item = shallow(<Text>X</Text>);
    // 删除数据
    defaultState.list.splice(1, 1);
    let todoLength = defaultState.list.length;
    let view = shallow(
      <View>
        <FlatList
          data={defaultState.list}
          // eslint-disable-next-line no-shadow
          renderItem={({item}) => <Item item={item} />}
          // eslint-disable-next-line no-shadow
          keyExtractor={(item) => item.id.toString()}
        />
      </View>,
    );
    item.find('Text').simulate('click');
    // eslint-disable-next-line jest/valid-expect
    expect(view.children()).to.have.lengthOf(todoLength); //判断点击删除后数据是否不显示
  });
  it('changeTodo', () => {
    // 初始数据
    const defaultState: TODO = {
      list: [{id: 0, content: 'todo1', status: 0}],
      finished: 0,
      input_value: '',
    };
    let item = shallow(
      <View>
        <Text
          style={{
            backgroundColor:
              defaultState.list[0].status === 0
                ? 'pink'
                : 'rgba(255, 255, 255, 0.5)',
          }}
        />
        ,
      </View>,
    );
    item.find('View').find('Text').simulate('click');
    defaultState.list[0].status = 1;
    item = shallow(
      <View>
        <Text
          style={{
            backgroundColor:
              defaultState.list[0].status === 0
                ? '#fff'
                : 'rgba(255, 255, 255, 0.5)',
          }}
        />
        ,
      </View>,
    );
    expect(
      item.find('View').find('Text').getElement().props.style.backgroundColor,
      // eslint-disable-next-line jest/valid-expect
    ).to.equal('rgba(255, 255, 255, 0.5)');
  });
});
