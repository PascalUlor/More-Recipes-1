import axios from 'axios';
import {
  IS_FAVORITE_RECIPES_FETCHING,
  FETCH_FAVORITE_RECIPES_SUCCESS,
  FETCH_FAVORITE_RECIPES_FAILURE
} from '../actionTypes/actionTypes';

const isFavoriteRecipesFetching = bool => ({
  type: IS_FAVORITE_RECIPES_FETCHING,
  bool
});

const favoriteRecipesSuccess = favoriteRecipes => ({
  type: FETCH_FAVORITE_RECIPES_SUCCESS,
  favoriteRecipes
});

const favoriteRecipesFailure = error => ({
  type: FETCH_FAVORITE_RECIPES_FAILURE,
  error
});

const fetchFavoriteRecipesRequest = () => (
  (dispatch) => {
    dispatch(isFavoriteRecipesFetching(true));
    return axios({
        method: 'GET',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: '/api/v1/user/favorites'
      })
      .then((response) => {
        dispatch(favoriteRecipesSuccess(response.data));
        dispatch(isFavoriteRecipesFetching(false));
      })
      .catch((error) => {
        dispatch(favoriteRecipesFailure(error.response.data.message));
        dispatch(isFavoriteRecipesFetching(false));
      });
  }
);

export default fetchFavoriteRecipesRequest;
