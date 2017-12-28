import {
  IS_ALL_RECIPES_FETCHING,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_ALL_RECIPES_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isAllRecipesFetching: false,
  fetchedAllRecipes: [],
  allRecipesError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_ALL_RECIPES_FETCHING:
      return Object.assign({}, state, { isAllRecipesFetching: action.bool });
    case FETCH_ALL_RECIPES_SUCCESS:
      return Object.assign({}, state, { fetchedAllRecipes: action.allRecipes });
    case FETCH_ALL_RECIPES_FAILURE:
      return Object.assign({}, state, { allRecipesError: action.error });
    default:
      return state;
  }
};
