import {
  IS_FAVORITE_RECIPES_FETCHING,
  FETCH_FAVORITE_RECIPES_SUCCESS,
  FETCH_FAVORITE_RECIPES_FAILURE,
  DELETE_FAVORITE_RECIPE_SUCCESS,
  DELETE_FAVORITE_RECIPE_SUCCESS_MESSAGE,
  DELETE_FAVORITE_RECIPE_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isFavoriteRecipesFetching: false,
  fetchedFavoriteRecipes: {},
  favoriteRecipesError: '',
  deleteFavoriteSuccessMessage: '',
  deleteFavoriteError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_FAVORITE_RECIPES_FETCHING:
      return Object.assign({}, state, { isFavoriteRecipesFetching: action.bool });
    case FETCH_FAVORITE_RECIPES_SUCCESS:
      return Object.assign({}, state, { fetchedFavoriteRecipes: action.favoriteRecipes });
    case FETCH_FAVORITE_RECIPES_FAILURE:
      return Object.assign({}, state, { favoriteRecipesError: action.error });
    case DELETE_FAVORITE_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        fetchedFavoriteRecipes: Object.assign({}, state.fetchedFavoriteRecipes, {
          favorites: state.fetchedFavoriteRecipes.favorites.filter(favorite => favorite.recipeId !== action.recipeId)
        })
      });
    case DELETE_FAVORITE_RECIPE_SUCCESS_MESSAGE:
      return Object.assign({}, state, { deleteFavoriteSuccessMessage: action.message });
    case DELETE_FAVORITE_RECIPE_FAILURE:
      return Object.assign({}, state, { deleteFavoriteError: action.error });
    default:
      return state;
  }
};
