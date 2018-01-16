import {
  IS_ALL_RECIPES_FETCHING,
  FETCH_ALL_RECIPES_SUCCESS,
  SET_PAGINATION_DETAILS,
  FETCH_ALL_RECIPES_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isAllRecipesFetching: false,
  fetchedAllRecipes: [],
  paginationDetails: {},
  allRecipesError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_ALL_RECIPES_FETCHING:
      return Object.assign({}, state, { isAllRecipesFetching: action.bool });
    case FETCH_ALL_RECIPES_SUCCESS:
      return Object.assign({}, state, { fetchedAllRecipes: action.allRecipes });
    case SET_PAGINATION_DETAILS:
      return Object.assign({}, state, { paginationDetails: action.details });
    case FETCH_ALL_RECIPES_FAILURE:
      return Object.assign({}, state, { allRecipesError: action.error });
    default:
      return state;
  }
};
