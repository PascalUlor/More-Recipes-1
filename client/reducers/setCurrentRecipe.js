import { SET_RECIPE_ID, SET_CURRENT_RECIPE, POST_REVIEW_SUCCESS } from '../actions/actionTypes/actionTypes';

const initialState = {
  currentSetRecipeId: 0,
  currentSetRecipe: {}
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RECIPE_ID:
      return Object.assign({}, state, { currentSetRecipeId: action.id });
    case SET_CURRENT_RECIPE:
      return Object.assign({}, state, { currentSetRecipe: action.recipe });
    case POST_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        currentSetRecipe: Object.assign({}, state.currentSetRecipe, {
          recipe: Object.assign({}, state.currentSetRecipe.recipe, {
            Reviews: state.currentSetRecipe.recipe.Reviews.concat(action.review)
          })
        })
      });
    default:
      return state;
  }
};
