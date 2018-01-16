import axios from 'axios';
import {
  IS_USER_RECIPES_FETCHING,
  FETCH_USER_RECIPES_SUCCESS,
  FETCH_USER_RECIPES_FAILURE
}
from '../actionTypes/actionTypes';
import { paginationDetails, setPaginationDetails } from './setPaginationDetailsAction';

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
        dispatch(fetchUserRecipesSuccess(response.data.recipes));
        dispatch(setPaginationDetails(paginationDetails(response)));
        dispatch(isUserRecipesFetching(false));
      }).catch((errors) => {
        dispatch(fetchUserRecipesFailure(errors.response.data.message));
        dispatch(isUserRecipesFetching(false));
      });
  }
);

export default fetchUserRecipesRequest;
