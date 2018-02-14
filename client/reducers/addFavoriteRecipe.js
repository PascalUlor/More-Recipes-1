import {
  ADD_FAVORITE_RECIPE_SUCCESS,
  ADD_FAVORITE_RECIPE_FAILURE
} from '../actions/actionTypes/actionTypes';

const initialState = {
  addFavoriteSuccess: '',
  addFavoriteError: ''
};

/**
 * @description holds success and failure states for favoriting recipe action
 * @function
 *
 * @param { object } state - contains reducer initial state
 * @param { object } action - contains action details to be performed
 *
 * @returns { object } the new add favorite action state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
  case ADD_FAVORITE_RECIPE_SUCCESS:
    return Object.assign({}, state, { addFavoriteSuccess: action.message });
  case ADD_FAVORITE_RECIPE_FAILURE:
    return Object.assign({}, state, { addFavoriteError: action.error });
  default:
    return state;
  }
};
