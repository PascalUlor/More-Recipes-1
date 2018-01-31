import axios from 'axios';
import {
  IS_POPULAR_RECIPES_FETCHING,
  FETCH_POPULAR_RECIPES_SUCCESS,
  FETCH_POPULAR_RECIPES_FAILURE
}
from '../actionTypes/actionTypes';

/**
 * @description handles fetch popular recipes loader
 *
 * @param { boolean } bool - contains popular recipes fetching state boolean
 *
 * @returns { object } loader - returns fetch poopular recipes loader action
 */
const isPopularRecipesFetching = bool => ({
  type: IS_POPULAR_RECIPES_FETCHING,
  bool
});

/**
 * @description handles fetch popular recipes success
 *
 * @param { object } popularRecipes - contains object of fetched popular recipes
 *
 * @returns { object } fetched recipes - returns fetched recipe success action
 */
const fetchPopularRecipesSuccess = popularRecipes => ({
  type: FETCH_POPULAR_RECIPES_SUCCESS,
  popularRecipes
});

/**
 * @description handles fetch popular recipes failure
 *
 * @param { string } error - contains string of fetched popular recipes error
 *
 * @returns { object } error object - returns popular recipes error action
 */
const fetchPopularRecipesFailure = error => ({
  type: FETCH_POPULAR_RECIPES_FAILURE,
  error
});

/**
 * @description handles fetch popular recipes request
 *
 * @returns { object } fetched recipes/error - returns fetch recipes action
 */
const fetchPopularRecipesRequest = () => (
  (dispatch) => {
    dispatch(isPopularRecipesFetching(true));
    return axios({
        method: 'GET',
        url: '/api/v1/recipes?sort=upvotes&order=desc'
      })
      .then((response) => {
        dispatch(fetchPopularRecipesSuccess(response.data.recipes));
        dispatch(isPopularRecipesFetching(false));
      })
      .catch((error) => {
        dispatch(fetchPopularRecipesFailure(error.response.data.message));
        dispatch(isPopularRecipesFetching(false));
      });
  }
);

export default fetchPopularRecipesRequest;
