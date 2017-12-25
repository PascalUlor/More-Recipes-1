import axios from 'axios';
import {
  IS_USER_RECIPES_FETCHING,
  FETCH_USER_RECIPES_SUCCESS,
  FETCH_USER_RECIPES_FAILURE
}
from '../actionTypes/actionTypes';

const isUserRecipesFetching = bool => ({
  type: IS_USER_RECIPES_FETCHING,
  bool
});

const fetchUserRecipesSuccess = userRecipes => ({
  type: FETCH_USER_RECIPES_SUCCESS,
  userRecipes
});

const fetchUserRecipesFailure = error => ({
  type: FETCH_USER_RECIPES_FAILURE,
  error
});

export const fetchRecipesRequest = callback => (
  (dispatch) => {
    dispatch(isUserRecipesFetching(true));
    axios({
        method: 'GET',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: '/api/v1/user/recipes'
      })
      .then((response) => {
        dispatch(fetchUserRecipesSuccess(response.data.recipes));
        dispatch(isUserRecipesFetching(false));
        callback();
      }).catch((errors) => {
        dispatch(fetchUserRecipesFailure(errors));
        dispatch(isUserRecipesFetching(false));
      });
  }
);
