import { SET_RECIPE_ID } from '../actions/actionTypes/actionTypes';

const initialState = {
  currentSetRecipeId: 0
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RECIPE_ID:
      return Object.assign({}, state, { currentSetRecipeId: action.id });
    default:
      return state;
  }
};
