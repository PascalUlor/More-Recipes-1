import {
  IS_RECIPE_TITLE_DOUBLE,
  DOUBLE_RECIPE_TITLE_ERROR,
  IS_RECIPE_CREATING,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isRecipeTitleDouble: false,
  doubleRecipeTitleError: '',
  isRecipeCreating: false,
  createRecipeError: '',
  createRecipeSuccess: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_RECIPE_TITLE_DOUBLE:
      return Object.assign({}, state, { isRecipeTitleDouble: action.bool });
    case DOUBLE_RECIPE_TITLE_ERROR:
      return Object.assign({}, state, { doubleRecipeTitleError: action.error });
    case IS_RECIPE_CREATING:
      return Object.assign({}, state, { isRecipeCreating: action.bool });
    case CREATE_RECIPE_SUCCESS:
      return Object.assign({}, state, { createRecipeSuccess: action.message });
    case CREATE_RECIPE_FAILURE:
      return Object.assign({}, state, { createRecipeError: action.error });
    default:
      return state;
  }
};
