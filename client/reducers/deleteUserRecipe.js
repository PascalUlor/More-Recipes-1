import {
  IS_RECIPE_DELETING,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE
} from '../actions/actionTypes/actionTypes';

const initialState = {
  isRecipeDeleting: false,
  deleteRecipeSuccess: '',
  deleteRecipeError: ''
};

/**
 * @description holds success and failure states for deleting a user recipe
 * @function
 *
 * @param { object } state - contains reducer initial state
 * @param { object } action - contains actions to be performed
 *
 * @returns { object } the new delete user recipe action state
 */
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
