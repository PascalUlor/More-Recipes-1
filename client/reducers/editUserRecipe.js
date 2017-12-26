import {
  IS_RECIPE_UPDATING,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isRecipeUpdating: false,
  updateRecipeSuccess: '',
  updateRecipeError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_RECIPE_UPDATING:
      return Object.assign({}, state, { isRecipeUpdating: action.bool });
    case UPDATE_RECIPE_SUCCESS:
      return Object.assign({}, state, { updateRecipeSuccess: action.message });
    case UPDATE_RECIPE_FAILURE:
      return Object.assign({}, state, { updateRecipeError: action.error });
    default:
      return state;
  }
};
