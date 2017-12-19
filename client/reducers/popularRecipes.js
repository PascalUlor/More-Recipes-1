import {
  IS_POPULAR_RECIPES_FETCHING,
  FETCH_POPULAR_RECIPES_SUCCESS,
  FETCH_POPULAR_RECIPES_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isPopularRecipesFetching: false,
  fetchedPopularRecipes: [],
  popularRecipesError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_POPULAR_RECIPES_FETCHING:
      return Object.assign({}, state, { isPopularRecipesFetching: action.bool });
    case FETCH_POPULAR_RECIPES_SUCCESS:
      return Object.assign({}, state, { fetchedPopularRecipes: action.popularRecipes });
    case FETCH_POPULAR_RECIPES_FAILURE:
      return Object.assign({}, state, { popularRecipesError: action.error });
    default:
      return state;
  }
};
