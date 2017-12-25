import {
  IS_RECIPE_DELETING,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isRecipeDeleting: false,
  deleteRecipeSuccess: '',
  deleteRecipeError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_RECIPE_DELETING:
      return Object.assign({}, state, { isRecipeDeleting: action.bool });
    case DELETE_RECIPE_SUCCESS:
      return Object.assign({}, state, { deleteRecipeSuccess: action.message });
    case DELETE_RECIPE_FAILURE:
      return Object.assign({}, state, { deleteRecipeError: action.error });
    default:
      return state;
  }
};
