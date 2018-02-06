import axios from 'axios';
import {
  IS_USER_RECIPES_FETCHING,
  FETCH_USER_RECIPES_SUCCESS,
  FETCH_USER_RECIPES_FAILURE
}
from '../actionTypes/actionTypes';


/**
 * @description handles fetch user recipes loader
 *
 * @param { boolean } bool - contains user recipes fetching state boolean
 *
 * @returns { object } loader - returns fetch user recipes loader action
 */
const isUserRecipesFetching = bool => ({
  type: IS_USER_RECIPES_FETCHING,
  bool
});

/**
 * @description handles fetch user recipes success
 *
 * @param { object } userRecipes - contains object of fetched user recipes
 *
 * @returns { object } fetched recipe - returns fetched recipe success action
 */
const fetchUserRecipesSuccess = userRecipes => ({
  type: FETCH_USER_RECIPES_SUCCESS,
  userRecipes
});

/**
 * @description handles fetch user recipes failure
 *
 * @param { string } error - contains string of fetched recipes error
 *
 * @returns { object } error object- returns fetched recipes error action
 */
const fetchUserRecipesFailure = error => ({
  type: FETCH_USER_RECIPES_FAILURE,
  error
});

/**
 * @description handles fetch user recipes request
 *
 * @param { number } page - contains page number of recipes to fetch
 *
 * @returns { object } fetched recipes/error - returns fetch recipe action
 */
const fetchUserRecipesRequest = page => (
  (dispatch) => {
    dispatch(isUserRecipesFetching(true));
    return axios({
        method: 'GET',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: `/api/v1/user/recipes?page=${page}`
      })
      .then((response) => {
        dispatch(fetchUserRecipesSuccess(response.data));
        dispatch(isUserRecipesFetching(false));
      }).catch((errors) => {
        dispatch(fetchUserRecipesFailure(errors.response.data.message));
        dispatch(isUserRecipesFetching(false));
      });
  }
);

export default fetchUserRecipesRequest;
