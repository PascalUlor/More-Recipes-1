import axios from 'axios';
import {
  IS_ALL_RECIPES_FETCHING,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_ALL_RECIPES_FAILURE
}
from '../actionTypes/actionTypes';
import { paginationDetails, setPaginationDetails } from './setPaginationDetailsAction';


const isAllRecipesFetching = bool => ({
  type: IS_ALL_RECIPES_FETCHING,
  bool
});

const fetchAllRecipesSuccess = allRecipes => ({
  type: FETCH_ALL_RECIPES_SUCCESS,
  allRecipes
});

const fetchAllRecipesFailure = error => ({
  type: FETCH_ALL_RECIPES_FAILURE,
  error
});

export const fetchAllRecipesRequest = page => (
  (dispatch) => {
    dispatch(isAllRecipesFetching(true));
    return axios({
        method: 'GET',
        url: `/api/v1/recipes?page=${page}`
      })
      .then((response) => {
        dispatch(fetchAllRecipesSuccess(response.data.recipes));
        dispatch(setPaginationDetails(paginationDetails(response)));
        dispatch(isAllRecipesFetching(false));
      }).catch((error) => {
        dispatch(fetchAllRecipesFailure(error.response.data.message));
        dispatch(isAllRecipesFetching(false));
      });
  }
);
