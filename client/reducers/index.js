import { combineReducers } from 'redux';
import flashMessage from './flashmessage';
import authenticatedUser from './authenticatedUser';
import createRecipe from './createRecipe';
import popularRecipes from './popularRecipes';
import userProfile from './profile';
import userRecipes from './fetchUserRecipes';
import deleteUserRecipe from './deleteUserRecipe';
import setCurrentRecipe from './setCurrentRecipe';
import editUserRecipe from './editUserRecipe';
import allRecipes from './allRecipes';
import postReview from './postReview';
import favoriteRecipes from './fetchFavoriteRecipes';
import addFavoriteRecipe from './addFavoriteRecipe';
import checkDoubleRecipeTitle from './checkDoubleRecipeTitle';

export default combineReducers({
  flashMessage,
  authenticatedUser,
  createRecipe,
  popularRecipes,
  allRecipes,
  userProfile,
  userRecipes,
  deleteUserRecipe,
  setCurrentRecipe,
  editUserRecipe,
  postReview,
  favoriteRecipes,
  addFavoriteRecipe,
  checkDoubleRecipeTitle
});
