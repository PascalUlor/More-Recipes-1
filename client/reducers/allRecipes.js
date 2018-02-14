import {
  IS_ALL_RECIPES_FETCHING,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_ALL_RECIPES_FAILURE
} from '../actions/actionTypes/actionTypes';

const initialState = {
  isAllRecipesFetching: false,
  fetchedAllRecipes: [],
  paginationDetails: {
    currentPage: 0,
    limit: 6,
    numberOfRecipes: 0,
    totalPages: 0
  },
  allRecipesError: ''
};

/**
 * @description holds pagination, success and failure states for fetching all
 * recipes action
 * @function
 *
 * @param { object } state - contains reducer initial state
 * @param { object } action - contains actions to be performed
 *
 * @returns { object } the new fetch all recipes action state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
  case IS_ALL_RECIPES_FETCHING:
    return Object.assign({}, state, { isAllRecipesFetching: action.bool });
  case FETCH_ALL_RECIPES_SUCCESS:
    return Object.assign({}, state, {
      fetchedAllRecipes: action.allRecipes.recipes,
      paginationDetails: Object.assign({}, state.paginationDetails, {
        currentPage: action.allRecipes.currentPage,
        numberOfRecipes: action.allRecipes.numberOfRecipes,
        totalPages: action.allRecipes.totalPages
      })
    });
  case FETCH_ALL_RECIPES_FAILURE:
    return Object.assign({}, state, {
      allRecipesError: action.error,
      fetchedAllRecipes: []
    });
  default:
    return state;
  }
};
