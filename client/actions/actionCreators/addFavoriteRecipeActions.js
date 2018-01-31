import axios from 'axios';
import {
  ADD_FAVORITE_RECIPE_SUCCESS,
  ADD_FAVORITE_RECIPE_FAILURE
}
from '../actionTypes/actionTypes';

/**
 * @description handles success for adding favorite recipe
 *
 * @param { string } message - contains success message
 *
 * @returns { object } success message - returns add favorite success action
 */
const addFavoriteSuccess = message => ({
  type: ADD_FAVORITE_RECIPE_SUCCESS,
  message
});

/**
 * @description handles error for adding favorite recipe
 *
 * @param { string } error - contains error message
 *
 * @returns { object } error message - returns add favorite failure action
 */
const addFavoriteError = error => ({
  type: ADD_FAVORITE_RECIPE_FAILURE,
  error
});

/**
 * @description handles add favorite recipe
 *
 * @param { number } recipeId - contains ID of recipe to favorite
 *
 * @returns { object } add favorite success/error - returns add favorite actions
 */
const addFavoriteRequest = recipeId => (
  dispatch => (
    axios({
      method: 'POST',
      headers: {
        'x-access-token': window.localStorage.jwtToken
      },
      url: `/api/v1/recipes/${recipeId}/favorites`
    })
    .then(response => dispatch(addFavoriteSuccess(response.data.message)))
    .catch(error => dispatch(addFavoriteError(error.response.data.message)))
  ));

export default addFavoriteRequest;
