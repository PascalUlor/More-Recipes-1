import { SET_RECIPE_ID } from '../actionTypes/actionTypes';


const setRecipeId = id => ({
  type: SET_RECIPE_ID,
  id
});

const setRecipeIdRequest = recipeId => (
  (dispatch) => {
    dispatch(setRecipeId(recipeId));
  }
);

export default setRecipeIdRequest;
