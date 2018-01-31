import {
  IS_RECIPE_TITLE_DOUBLE,
  DOUBLE_RECIPE_TITLE_ERROR
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isRecipeTitleDouble: false,
  doubleRecipeTitleError: ''
};
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
