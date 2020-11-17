import reducers from '../store/reducer';
import {
  getAddItemAction,
  getChangeItemAction,
  // getDataAction,
  getDeleteItemAction,
} from '../store/reducer';

describe('redux test', () => {
  it('addTodo', () => {
    const state = {
      list: [{id: 1, value: 'value-1', status: 0}],
      finished: 0,
      content: '',
    };
    const list = {id: 2, value: 'value-2', status: 0};

    const expected = {
      list: [
        {id: 1, value: 'value-1', status: 0},
        {id: 2, value: 'value-2', status: 0},
      ],
      finished: 0,
      content: '',
    };
    const result = reducers(state, getAddItemAction(list));
    expect(result).toEqual(expected);
  });
  it('delTodo', () => {
    const state = {
      list: [
        {id: 1, value: 'value-1', status: 0},
        {id: 2, value: 'value-2', status: 0},
      ],
      finished: 0,
      content: '',
    };
    const list = {id: 2, value: 'value-2', status: 0};
    const expected = {
      list: [{id: 1, value: 'value-1', status: 0}],
      finished: 0,
      content: '',
    };
    const result = reducers(state, getDeleteItemAction(list.id));
    expect(result).toEqual(expected);
  });
  it('changeTodo', () => {
    const state = {
      list: [
        {id: 1, value: 'value-1', status: 0},
        {id: 2, value: 'value-2', status: 0},
      ],
      finished: 0,
      content: '',
    };
    const list = {id: 2, value: 'value-2', status: 0};
    const expected = {
      list: [
        {id: 1, value: 'value-1', status: 0},
        {id: 2, value: 'value-2', status: 1},
      ],
      finished: 1,
      content: '',
    };
    const result = reducers(state, getChangeItemAction(list.id));
    expect(result).toEqual(expected);
  });
});
