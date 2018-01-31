import { ADD_FLASH_MESSAGE } from '../actions/actionTypes/actionTypes';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return Object.assign({}, state, {
        type: action.message.type,
        text: action.message.text
      });
    default:
      return state;
  }
};
