import reducers from '../store/reducer';
import {
  getAddItemAction,
  getChangeItemAction,
  getDeleteItemAction
} from '../store/reducer';

describe('redux test', () => {

it('additem' ,function(){
    const state = {
      todoli: [{ id: 1, value: 'value-1', status: 0 }],
      checked: 0,
      content: '',
    };
    const todoli = { id: 2, value: 'value-2', status: 0 };
    const testitem = {
      todoli: [
        { id: 1, value: 'value-1', status: 0 },
        { id: 2, value: 'value-2', status: 0 },
      ],
      checked: 0,
      content: '',
    };
    const result = reducers(state, getAddItemAction(todoli));
    expect(result).toEqual(testitem);
    console.log(testitem);
  });

  it('delTodo', function() {
    const state = {
      todoli: [
        { id: 1, value: 'value-1', status: 0 },
        { id: 2, value: 'value-2', status: 0 },
      ],
      checked: 0,
      content: '',
    };
    const todoli = { id: 2, value: 'value-2', status: 0 };
    const testitem = {
      todoli: [{ id: 1, value: 'value-1', status: 0 }],
      checked: 0,
      content: '',
    };
    const result = reducers(state, getDeleteItemAction(todoli.id));
    expect(result).toEqual(testitem);
  });

  it('changeTodo', function(){
    const state = {
      todoli: [
        { id: 1, value: 'value-1', status: 0 },
        { id: 2, value: 'value-2', status: 0 },
      ],
      checked: 0,
      content: '',
    };
    const todoli = { id: 2, value: 'value-2', status: 0 };
    const testitem = {
      todoli: [
        { id: 1, value: 'value-1', status: 0 },
        { id: 2, value: 'value-2', status: 1 },
      ],
      checked: 1,
      content: '',
    };
    const result = reducers(state, getChangeItemAction(todoli.id));
    expect(result).toEqual(testitem);
  });

});

