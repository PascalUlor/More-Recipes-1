import {
  IS_RECIPE_TITLE_DOUBLE,
  DOUBLE_RECIPE_TITLE_ERROR
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isRecipeTitleDouble: false,
  doubleRecipeTitleError: ''
};

/**
 * @description checks if a recipe title already exist on creating
 * @function
 *
 * @param { object } state - contains reducer initial state
 * @param { object } action - contains actions to be performed
 *
 * @returns { object } the new action state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_RECIPE_TITLE_DOUBLE:
      return Object.assign({}, state, { isRecipeTitleDouble: action.bool });
    case DOUBLE_RECIPE_TITLE_ERROR:
      return Object.assign({}, state, { doubleRecipeTitleError: action.error });
    default:
      return state;
  }
};
