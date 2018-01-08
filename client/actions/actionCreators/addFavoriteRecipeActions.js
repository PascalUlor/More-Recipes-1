import axios from 'axios';
import {
  ADD_FAVORITE_RECIPE_SUCCESS,
  ADD_FAVORITE_RECIPE_FAILURE
}
from '../actionTypes/actionTypes';

const addFavoriteSuccess = message => ({
  type: ADD_FAVORITE_RECIPE_SUCCESS,
  message
});

const addFavoriteError = error => ({
  type: ADD_FAVORITE_RECIPE_FAILURE,
  error
});

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
