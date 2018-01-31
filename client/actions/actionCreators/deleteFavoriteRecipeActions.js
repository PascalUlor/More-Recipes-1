import axios from 'axios';

import {
  DELETE_FAVORITE_RECIPE_SUCCESS,
  DELETE_FAVORITE_RECIPE_FAILURE
} from '../actionTypes/actionTypes';

/**
 * @description handles delete favorite recipe success
 *
 * @param { number } recipeId - contains ID of recipe been deleted
 * @param { string } message - contains delete success message
 *
 * @returns { object } deleted recipe - returns delete favorite success action
 */
const deleteFavouriteSuccess = (recipeId, message) => ({
  type: DELETE_FAVORITE_RECIPE_SUCCESS,
  recipeId,
  message
});

/**
 * @description handles delete favorite recipe failure
 *
 * @param { string } error - contains success message
 *
 * @returns { object } error object - returns delete recipe failure action
 */
const deleteFavouriteFailure = error => ({
  type: DELETE_FAVORITE_RECIPE_FAILURE,
  error
});

/**
 * @description handles delete favorite recipe
 *
 * @param { object } recipeId - contains ID of favorite recipe to be deleted
 *
 * @returns { object } deleted recipe - returns delete favorite recipe action
 */
const deleteFavouriteRecipeRequest = recipeId => (
  dispatch => (
    axios({
      method: 'DELETE',
      headers: {
        'x-access-token': window.localStorage.jwtToken
      },
      url: `/api/v1/user/favorites/${recipeId}`,
    })
    .then(response =>
      dispatch(deleteFavouriteSuccess(recipeId, response.data.message)))
    .catch(error =>
      dispatch(deleteFavouriteFailure(error.response.data.message)))
  ));

export default deleteFavouriteRecipeRequest;
