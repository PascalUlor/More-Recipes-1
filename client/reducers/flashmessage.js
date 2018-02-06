import { ADD_FLASH_MESSAGE } from '../actions/actionTypes/actionTypes';


/**
 * @description holds success and failure messages user signin or signup action
 * @function
 *
 * @param { object } state - contains reducer initial state
 * @param { object } action - contains actions to be performed
 *
 * @returns { object } the new flash message state
 */
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
