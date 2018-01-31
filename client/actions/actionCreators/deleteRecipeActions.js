import axios from 'axios';
import {
  IS_RECIPE_DELETING,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE
} from '../actionTypes/actionTypes';

/**
 * @description handles delete user recipe loader
 *
 * @param { boolean } bool - contains recipe deteling state boolean
 *
 * @returns { object } loader - returns delete recipe loader action
 */
const isRecipeDeleting = bool => ({
  type: IS_RECIPE_DELETING,
  bool
});

/**
 * @description handles delete user recipe success
 *
 * @param { number } recipeId - contains ID of recipe been deleted
 * @param { string } message - contains delete success message
 *
 * @returns { object } deleted recipe - returns delete recipe success action
 */
const deleteRecipeSuccess = (recipeId, message) => ({
  type: DELETE_RECIPE_SUCCESS,
  recipeId,
  message
});

/**
 * @description handles delete favorite recipe success
 *
 * @param { number } error - contains ID of recipe been deleted
 *
 * @returns { object } recipe error - returns delete recpe failure action
 */
const deleteRecipeError = error => ({
  type: DELETE_RECIPE_FAILURE,
  error
});

/**
 * @description handles delete favorite recipe
 *
 * @param { object } recipeId - contains ID of user          recipe to be deleted
 *
 * @returns { object } deleted recipe - returns delete user recipe action
 */
const deleteRecipeRequest = recipeId => (
  (dispatch) => {
    dispatch(isRecipeDeleting(true));
    return axios({
        method: 'DELETE',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: `/api/v1/recipes/${recipeId}`
      })
      .then((response) => {
        dispatch(deleteRecipeSuccess(recipeId, response.data.message));
        dispatch(isRecipeDeleting(false));
      }).catch((errors) => {
        dispatch(deleteRecipeError(errors.message));
        dispatch(isRecipeDeleting(false));
      });
  }
);

export default deleteRecipeRequest;
