import axios from 'axios';
import {
  IS_ALL_RECIPES_FETCHING,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_ALL_RECIPES_FAILURE
}
from '../actionTypes/actionTypes';
import {
  paginationDetails,
  setPaginationDetails
} from './setPaginationDetailsAction';


/**
 * @description handles fetch all recipes loader
 *
 * @param { boolean } bool - contains all recipes fetching state boolean
 *
 * @returns { object } loader - returns fetch all recipe loader action
 */
const isAllRecipesFetching = bool => ({
  type: IS_ALL_RECIPES_FETCHING,
  bool
});

/**
 * @description handles fetch all recipe success
 *
 * @param { array } allRecipes - contains array of all fetched recipes
 *
 * @returns { object } all recipe - returns all fetched recipe success action
 */
const fetchAllRecipesSuccess = allRecipes => ({
  type: FETCH_ALL_RECIPES_SUCCESS,
  allRecipes
});

/**
 * @description handles fetch all recipe failure
 *
 * @param { string } error - contains error message of fetched recipes
 *
 * @returns { object } recipes error - returns fetched recipes failure action
 */
const fetchAllRecipesFailure = error => ({
  type: FETCH_ALL_RECIPES_FAILURE,
  error
});

/**
 * @description handles update user recipe request
 *
 * @param { number } page - contains page number of recipes to fetch
 *
 * @returns { object } fetched recipes/error - returns fetch recipe action
 */
export const fetchAllRecipesRequest = page => (
  (dispatch) => {
    dispatch(isAllRecipesFetching(true));
    return axios({
        method: 'GET',
        url: `/api/v1/recipes?page=${page}`
      })
      .then((response) => {
        dispatch(fetchAllRecipesSuccess(response.data.recipes));
        dispatch(setPaginationDetails(paginationDetails(response)));
        dispatch(isAllRecipesFetching(false));
      }).catch((error) => {
        dispatch(fetchAllRecipesFailure(error.response.data.message));
        dispatch(isAllRecipesFetching(false));
      });
  }
);
