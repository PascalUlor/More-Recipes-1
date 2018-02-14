import flashMessage from '../../reducers/flashmessage';
import { ADD_FLASH_MESSAGE } from '../../actions/actionTypes/actionTypes';

describe('Flash Message Reducer', () => {
  it('should return proper initial state', (done) => {
    expect(flashMessage(undefined, {})).toEqual({});
    done();
  });

  it('should set current messsage when passed ADD_FLASH_MESSAGE', (done) => {
    const message = { type: 'Success', text: 'Successfully Created Account' };

    const action = {
      type: ADD_FLASH_MESSAGE,
      message
    };

    const newState = flashMessage({}, action);
    expect(newState.type).toEqual('Success');
    expect(newState.text).toEqual('Successfully Created Account');
    done();
  });
});
