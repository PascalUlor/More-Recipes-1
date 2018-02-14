import {
  IS_USER_RECIPES_FETCHING,
  FETCH_USER_RECIPES_SUCCESS,
  FETCH_USER_RECIPES_FAILURE,
  CREATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
} from '../actions/actionTypes/actionTypes';

const initialState = {
  isUserRecipesFetching: false,
  fetchedUserRecipes: [],
  paginationDetails: {
    currentPage: 0,
    limit: 6,
    numberOfRecipes: 0,
    totalPages: 0
  },
  userRecipesError: ''
};

/**
 * @description holds success, failure and pagination states for fetching,
 * upadting and deleting user recipes
 * @function
 *
 * @param { object } state - contains reducer initial state
 * @param { object } action - contains actions to be performed
 *
 * @returns { object } the new user recipes state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
  case IS_USER_RECIPES_FETCHING:
    return Object.assign({}, state, { isUserRecipesFetching: action.bool });
  case FETCH_USER_RECIPES_SUCCESS:
    return Object.assign({}, state, {
      fetchedUserRecipes: action.userRecipes.recipes,
      paginationDetails: Object.assign({}, state.paginationDetails, {
        currentPage: action.userRecipes.currentPage,
        numberOfRecipes: action.userRecipes.numberOfRecipes,
        totalPages: action.userRecipes.totalPages
      })
    });
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
        ((recipe.id === action.updatedRecipe.id) ?
          action.updatedRecipe :
          recipe))
    });
  case DELETE_RECIPE_SUCCESS:
    return Object.assign({}, state, {
      fetchedUserRecipes: state.fetchedUserRecipes
        .filter(recipe => recipe.id !== action.recipeId),
      paginationDetails: Object.assign({}, state.paginationDetails, {
        numberOfRecipes: state.paginationDetails.numberOfRecipes - 1
      })
    });
  default:
    return state;
  }
};
