import axios from 'axios';
import {
  IS_RECIPE_DELETING,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE
} from '../actionTypes/actionTypes';

const isRecipeDeleting = bool => ({
  type: IS_RECIPE_DELETING,
  bool
});

const deleteRecipeSuccess = (recipeId, message) => ({
  type: DELETE_RECIPE_SUCCESS,
  recipeId,
  message
});

const deleteRecipeError = error => ({
  type: DELETE_RECIPE_FAILURE,
  error
});

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
