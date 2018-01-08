import {
  ADD_FAVORITE_RECIPE_SUCCESS,
  ADD_FAVORITE_RECIPE_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  addFavoriteSuccess: '',
  addFavoriteError: ''
};
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
