import {
  IS_FAVORITE_RECIPES_FETCHING,
  FETCH_FAVORITE_RECIPES_SUCCESS,
  FETCH_FAVORITE_RECIPES_FAILURE,
  DELETE_FAVORITE_RECIPE_SUCCESS,
  DELETE_FAVORITE_RECIPE_FAILURE
} from '../actions/actionTypes/actionTypes';

const initialState = {
  isFavoriteRecipesFetching: false,
  fetchedFavoriteRecipes: [],
  paginationDetails: {
    currentPage: 0,
    limit: 6,
    numberOfRecipes: 0,
    totalPages: 0
  },
  favoriteRecipesError: '',
  deleteFavoriteSuccessMessage: '',
  deleteFavoriteError: ''
};

/**
 * @description holds success, failure and pagination states for fetching and
 * deleting user favourite recipes
 * @function
 *
 * @param { object } state - contains reducer initial state
 * @param { object } action - contains actions to be performed
 *
 * @returns { object } the new user favorite recipes state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
  case IS_FAVORITE_RECIPES_FETCHING:
    return Object.assign({}, state, {
      isFavoriteRecipesFetching: action.bool
    });
  case FETCH_FAVORITE_RECIPES_SUCCESS:
    return Object.assign({}, state, {
      fetchedFavoriteRecipes: action.favoriteRecipes.recipes,
      paginationDetails: Object.assign({}, state.paginationDetails, {
        currentPage: action.favoriteRecipes.currentPage,
        numberOfRecipes: action.favoriteRecipes.numberOfRecipes,
        totalPages: action.favoriteRecipes.totalPages
      })
    });
  case FETCH_FAVORITE_RECIPES_FAILURE:
    return Object.assign({}, state, { favoriteRecipesError: action.error });
  case DELETE_FAVORITE_RECIPE_SUCCESS:
    return Object.assign({}, state, {
      fetchedFavoriteRecipes: state.fetchedFavoriteRecipes
        .filter(favorite => favorite.recipeId !== action.recipeId),
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
