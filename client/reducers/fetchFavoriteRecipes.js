import {
  IS_FAVORITE_RECIPES_FETCHING,
  FETCH_FAVORITE_RECIPES_SUCCESS,
  FETCH_FAVORITE_RECIPES_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isFavoriteRecipesFetching: false,
  fetchedFavoriteRecipes: {},
  favoriteRecipesError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_FAVORITE_RECIPES_FETCHING:
      return Object.assign({}, state, { isFavoriteRecipesFetching: action.bool });
    case FETCH_FAVORITE_RECIPES_SUCCESS:
      return Object.assign({}, state, { fetchedFavoriteRecipes: action.favoriteRecipes });
    case FETCH_FAVORITE_RECIPES_FAILURE:
      return Object.assign({}, state, { favoriteRecipesError: action.error });
    default:
      return state;
  }
};
