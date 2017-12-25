import axios from 'axios';
import {
  IS_RECIPE_DELETING,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE
} from '../actionTypes/actionTypes';
import { fetchRecipesRequest } from './getUserRecipesActions';

const isRecipeDeleting = bool => ({
  type: IS_RECIPE_DELETING,
  bool
});

const deleteRecipeSuccess = message => ({
  type: DELETE_RECIPE_SUCCESS,
  message
});

const deleteRecipeError = error => ({
  type: DELETE_RECIPE_FAILURE,
  error
});

const deleteRecipeRequest = (recipeId, callback) => (
  (dispatch) => {
    dispatch(isRecipeDeleting(true));
    axios({
        method: 'DELETE',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: `/api/v1/recipes/${recipeId}`
      })
      .then((response) => {
        dispatch(deleteRecipeSuccess(response.data.message));
        dispatch(isRecipeDeleting(false));
        callback();
        dispatch(fetchRecipesRequest());
      }).catch((errors) => {
        dispatch(deleteRecipeError(errors.message));
        dispatch(isRecipeDeleting(false));
        callback();
      });
  }
);

export default deleteRecipeRequest;
