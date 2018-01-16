import {
  IS_FAVORITE_RECIPES_FETCHING,
  FETCH_FAVORITE_RECIPES_SUCCESS,
  SET_PAGINATION_DETAILS,
  FETCH_FAVORITE_RECIPES_FAILURE,
  DELETE_FAVORITE_RECIPE_SUCCESS,
  DELETE_FAVORITE_RECIPE_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isFavoriteRecipesFetching: false,
  fetchedFavoriteRecipes: [],
  paginationDetails: {},
  favoriteRecipesError: '',
  deleteFavoriteSuccessMessage: '',
  deleteFavoriteError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_FAVORITE_RECIPES_FETCHING:
      return Object.assign({}, state, { isFavoriteRecipesFetching: action.bool });
    case FETCH_FAVORITE_RECIPES_SUCCESS:
      return Object.assign({}, state, {
        fetchedFavoriteRecipes: action.favoriteRecipes
      });
    case SET_PAGINATION_DETAILS:
      return Object.assign({}, state, { paginationDetails: action.details });
    case FETCH_FAVORITE_RECIPES_FAILURE:
      return Object.assign({}, state, { favoriteRecipesError: action.error });
    case DELETE_FAVORITE_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        fetchedFavoriteRecipes: state.fetchedFavoriteRecipes.filter(favorite => favorite.recipeId !== action.recipeId),
        deleteFavoriteSuccessMessage: action.message,
        paginationDetails: Object.assign({}, state.paginationDetails, {
          numberOfRecipes: state.paginationDetails.numberOfRecipes - 1
        })
      });
    case DELETE_FAVORITE_RECIPE_FAILURE:
      return Object.assign({}, state, { deleteFavoriteError: action.error });
    default:
      return state;
  }
};
