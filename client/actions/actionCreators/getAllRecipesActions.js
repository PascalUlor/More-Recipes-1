import axios from 'axios';
import {
  IS_ALL_RECIPES_FETCHING,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_ALL_RECIPES_FAILURE
}
from '../actionTypes/actionTypes';


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

export const fetchAllRecipesRequest = callback => (
  (dispatch) => {
    dispatch(isAllRecipesFetching(true));
    axios({
        method: 'GET',
        url: '/api/v1/recipes'
      })
      .then((response) => {
        dispatch(fetchAllRecipesSuccess(response.data.recipes));
        dispatch(isAllRecipesFetching(false));
        callback();
      }).catch((errors) => {
        dispatch(fetchAllRecipesFailure(errors));
        dispatch(isAllRecipesFetching(false));
        callback();
      });
  }
);
