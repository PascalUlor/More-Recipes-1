import axios from 'axios';
import {
  IS_POPULAR_RECIPES_FETCHING,
  FETCH_POPULAR_RECIPES_SUCCESS,
  FETCH_POPULAR_RECIPES_FAILURE
}
from '../actionTypes/actionTypes';

const isPopularRecipeFetching = bool => ({
  type: IS_POPULAR_RECIPES_FETCHING,
  bool
});

const fetchPopularRecipesSuccess = popularRecipes => ({
  type: FETCH_POPULAR_RECIPES_SUCCESS,
  popularRecipes
});

const fetchPopularRecipesFailure = error => ({
  type: FETCH_POPULAR_RECIPES_FAILURE,
  error
});

export const fetchRecipeRequest = callback => (
  (dispatch) => {
    dispatch(isPopularRecipeFetching(true));
    axios({
        method: 'GET',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: '/api/v1/recipes?sort=upvotes&order=desc'
      })
      .then((response) => {
        dispatch(fetchPopularRecipesSuccess(response.data.recipes));
        dispatch(isPopularRecipeFetching(false));
        callback();
      }).catch((errors) => {
        dispatch(fetchPopularRecipesFailure(errors));
        dispatch(isPopularRecipeFetching(false));
        callback();
      });
  }
);
