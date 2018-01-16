import {
  IS_USER_RECIPES_FETCHING,
  FETCH_USER_RECIPES_SUCCESS,
  SET_PAGINATION_DETAILS,
  FETCH_USER_RECIPES_FAILURE,
  CREATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isUserRecipesFetching: false,
  fetchedUserRecipes: [],
  paginationDetails: {},
  userRecipesError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_USER_RECIPES_FETCHING:
      return Object.assign({}, state, { isUserRecipesFetching: action.bool });
    case FETCH_USER_RECIPES_SUCCESS:
      return Object.assign({}, state, { fetchedUserRecipes: action.userRecipes });
    case SET_PAGINATION_DETAILS:
      return Object.assign({}, state, { paginationDetails: action.details });
    case FETCH_USER_RECIPES_FAILURE:
      return Object.assign({}, state, { userRecipesError: action.error });
    case CREATE_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        fetchedUserRecipes: state.fetchedUserRecipes.concat(action.createdRecipe),
        paginationDetails: Object.assign({}, state.paginationDetails, {
          numberOfRecipes: state.paginationDetails.numberOfRecipes + 1
        })
      });
    case UPDATE_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        fetchedUserRecipes: state.fetchedUserRecipes.map(recipe =>
          ((recipe.id === action.updatedRecipe.id) ? action.updatedRecipe : recipe))
      });
    case DELETE_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        fetchedUserRecipes: state.fetchedUserRecipes.filter(recipe => recipe.id !== action.recipeId),
        paginationDetails: Object.assign({}, state.paginationDetails, {
          numberOfRecipes: state.paginationDetails.numberOfRecipes - 1
        })
      });
    default:
      return state;
  }
};
