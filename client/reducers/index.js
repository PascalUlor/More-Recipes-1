import { combineReducers } from 'redux';
import flashMessages from './flashmessages';
import authUser from './authUser';
import createRecipe from './createRecipe';
import popularRecipes from './popularRecipes';
import userProfile from './profile';
import userRecipes from './fetchUserRecipes';
import deleteUserRecipe from './deleteUserRecipe';
import setRecipeId from './setRecipeId';

export default combineReducers({
  flashMessages,
  authUser,
  createRecipe,
  popularRecipes,
  userProfile,
  userRecipes,
  deleteUserRecipe,
  setRecipeId
});
