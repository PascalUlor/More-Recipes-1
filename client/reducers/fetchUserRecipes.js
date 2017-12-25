import {
  IS_USER_RECIPES_FETCHING,
  FETCH_USER_RECIPES_SUCCESS,
  FETCH_USER_RECIPES_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isUserRecipesFetching: false,
  fetchedUserRecipes: [],
  userRecipesError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_USER_RECIPES_FETCHING:
      return Object.assign({}, state, { isUserRecipesFetching: action.bool });
    case FETCH_USER_RECIPES_SUCCESS:
      return Object.assign({}, state, { fetchedUserRecipes: action.userRecipes });
    case FETCH_USER_RECIPES_FAILURE:
      return Object.assign({}, state, { userRecipesError: action.error });
    default:
      return state;
  }
};
