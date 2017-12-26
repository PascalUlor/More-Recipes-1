import axios from 'axios';
import { SET_RECIPE_ID, SET_CURRENT_RECIPE } from '../actionTypes/actionTypes';


const setRecipeId = id => ({
  type: SET_RECIPE_ID,
  id
});

const setCurrentRecipe = recipe => ({
  type: SET_CURRENT_RECIPE,
  recipe
});

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
