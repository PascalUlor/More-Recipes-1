/* eslint-disable */
import flashMessage from '../../actions/actionCreators/flashMessage';
import * as types from '../../actions/actionTypes/actionTypes';

describe('flash messsage action', () => {
  it('should create a new recipe', (done) => {
    const message = {
      type: 'Success',
      text: 'You are now logged in'
    };
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE, message }
    ];

    const store = mockStore({});
    store.dispatch(flashMessage(message));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
