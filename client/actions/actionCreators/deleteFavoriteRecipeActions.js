import axios from 'axios';

import {
  DELETE_FAVORITE_RECIPE_SUCCESS,
  DELETE_FAVORITE_RECIPE_FAILURE
} from '../actionTypes/actionTypes';

const deleteFavouriteSuccess = (recipeId, message) => ({
  type: DELETE_FAVORITE_RECIPE_SUCCESS,
  recipeId,
  message
});

const deleteFavouriteFailure = error => ({
  type: DELETE_FAVORITE_RECIPE_FAILURE,
  error
});

const deleteFavouriteRecipeRequest = recipeId => (
  dispatch => (
    axios({
      method: 'DELETE',
      headers: {
        'x-access-token': window.localStorage.jwtToken
      },
      url: `/api/v1/user/favorites/${recipeId}`,
    })
    .then(response => dispatch(deleteFavouriteSuccess(recipeId, response.data.message)))
    .catch(error => dispatch(deleteFavouriteFailure(error.response.data.message)))
  ));

export default deleteFavouriteRecipeRequest;
