import { combineReducers } from 'redux';
import flashMessages from './flashmessages';
import authUser from './authUser';
import createRecipe from './createRecipe';
import popularRecipes from './popularRecipes';
import userProfile from './profile';
import userRecipes from './fetchUserRecipes';
import deleteUserRecipe from './deleteUserRecipe';
import setCurrentRecipe from './setCurrentRecipe';
import editUserRecipe from './editUserRecipe';
import allRecipes from './allRecipes';

export default combineReducers({
  flashMessages,
  authUser,
  createRecipe,
  popularRecipes,
  allRecipes,
  userProfile,
  userRecipes,
  deleteUserRecipe,
  setCurrentRecipe,
  editUserRecipe
});
