import { combineReducers } from 'redux';
import flashMessages from './flashmessages';
import authUser from './authUser';
import createRecipe from './createRecipe';
import popularRecipes from './popularRecipes';

export default combineReducers({
  flashMessages,
  authUser,
  createRecipe,
  popularRecipes
});
