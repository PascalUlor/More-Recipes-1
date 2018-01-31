import axios from 'axios';
import {
  SET_RECIPE_ID,
  SET_CURRENT_RECIPE
} from '../actionTypes/actionTypes';

/**
 * @description handles setting selected recipe ID
 *
 * @param { number } id - contains recipe ID of currently selected recipe
 *
 * @returns { object } set ID - returns set recipe ID action
 */
const setRecipeId = id => ({
  type: SET_RECIPE_ID,
  id
});

/**
 * @description handles setting selected recipe ID
 *
 * @param { object } recipe - contains object details of selected recipe
 *
 * @returns { object } set recipe - returns set select recipe action
 */
const setCurrentRecipe = recipe => ({
  type: SET_CURRENT_RECIPE,
  recipe
});

/**
 * @description handles setting currently selected recipe details
 *
 * @param { number } recipeId - contains recipe ID of currently selected recipe
 *
 * @returns { object } set ID - returns set recipe details action
 */
const setCurrentRecipeRequest = recipeId => (
  (dispatch) => {
    axios({
        method: 'GET',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: `/api/v1/recipes/${recipeId}`
      })
      .then((response) => {
        dispatch(setRecipeId(recipeId));
        dispatch(setCurrentRecipe(response.data));
      })
      .catch(() => {
        dispatch(setRecipeId(0));
        dispatch(setCurrentRecipe({}));
      });
  }
);

export default setCurrentRecipeRequest;
