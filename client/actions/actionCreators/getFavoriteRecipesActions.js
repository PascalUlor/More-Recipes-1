import axios from 'axios';
import {
  IS_FAVORITE_RECIPES_FETCHING,
  FETCH_FAVORITE_RECIPES_SUCCESS,
  FETCH_FAVORITE_RECIPES_FAILURE
} from '../actionTypes/actionTypes';

/**
 * @description handles fetch user favorite recipes loader
 *
 * @param { boolean } bool - contains favorite recipe fetching state boolean
 *
 * @returns { object } loader - returns fetch favorite recipes loader action
 */
const isFavoriteRecipesFetching = bool => ({
  type: IS_FAVORITE_RECIPES_FETCHING,
  bool
});

/**
 * @description handles fetch user favourite recipes success
 *
 * @param { object } favoriteRecipes - contains object of fetched recipes
 *
 * @returns { object } fetched recipe - returns fetched recipe success action
 */
const favoriteRecipesSuccess = favoriteRecipes => ({
  type: FETCH_FAVORITE_RECIPES_SUCCESS,
  favoriteRecipes
});

/**
 * @description handles fetch user favorite recipes failure
 *
 * @param { string } error - contains string of fetched recipes error
 *
 * @returns { object } error object- returns fetched favorites error action
 */
const favoriteRecipesFailure = error => ({
  type: FETCH_FAVORITE_RECIPES_FAILURE,
  error
});

/**
 * @description handles fetch user favorite recipes request
 *
 * @param { number } page - contains page number of recipes to fetch
 *
 * @returns { object } fetched recipes/error - returns fetch recipe action
 */
const fetchFavoriteRecipesRequest = page => (
  (dispatch) => {
    dispatch(isFavoriteRecipesFetching(true));
    return axios({
        method: 'GET',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: `/api/v1/user/favorites?page=${page}`
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
