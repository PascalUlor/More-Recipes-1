import express from 'express';
import UserValidation from '../middleware/validations/users';
import UserController from '../controllers/users';
import DoubleTitleValidation from '../middleware/validations/doubleTitleCheck';
import RecipesValidation from '../middleware/validations/recipes';
import RecipesController from '../controllers/recipes';
import ReviewsValidation from '../middleware/validations/reviews';
import ReviewsController from '../controllers/reviews';
import FavoritesController from '../controllers/favorites';
import VotesController from '../controllers/votes';
import tokenAuth from '../middleware/authToken';
import checkToken from '../middleware/checkToken';

const router = express.Router();


/**
 * @description User signup and sign in routes
 */
router.route('/users/signup')
  .post(UserValidation.signup, UserController.signup);
router.route('/users/signin')
  .post(UserValidation.signin, UserController.signin);

/**
 *@description  User profile routes
 */
router.route('/user/profile')
  .get(tokenAuth, UserController.getUser)
  .put(tokenAuth, UserValidation.updateUserValidations, UserController.updateUser);

/**
 * @description Recipe routes
 */
// POST route to check if recipe already exist before image file upload occurs
router.route('/recipes/checkTitle')
  .post(tokenAuth, DoubleTitleValidation.checkForDoubleRecipeTitle);
// POST and GET routes to add a recipe and get recipes(sorted or not sorted formats)
router.route('/recipes')
  .post(tokenAuth, RecipesValidation.addRecipeValidations, RecipesController.addRecipe)
  .get(RecipesValidation.getSortdedRecipesValidation, RecipesController.getRecipes);
// GET route to get all recipes for a particular user
router.route('/user/recipes')
  .get(tokenAuth, RecipesController.getUserRecipes);
// PUT, DELETE and GET routes to modify/update, delete and get a particular recipe
router.route('/recipes/:recipeID')
  .put(tokenAuth, RecipesValidation.updateRecipeValidations, RecipesController.updateRecipe)
  .delete(tokenAuth, RecipesController.deleteRecipe)
  .get(checkToken, RecipesController.getSingleRecipe);

/**
 * @description Recipe review routes
 */
// POST route to create/add a review for a recipe
router.route('/recipes/:recipeID/reviews')
  .post(tokenAuth, ReviewsValidation.postReviewValidations, ReviewsController.postReview);

/**
 * @description Recipe favorite routes
 */
// POST route to create/add user's favorite recipes
router.route('/recipes/:recipeID/favorites')
  .post(tokenAuth, FavoritesController.addToFavorite);
// GET route to retrieve user's favorite recipes
router.route('/user/favorites')
  .get(tokenAuth, FavoritesController.getFavoriteRecipes);
// DELETE route to delete a user's favorite recipe
router.route('/user/favorites/:recipeID')
  .delete(tokenAuth, FavoritesController.deleteFavoriteRecipe);

/**
 * @description Recipe voting route
 */
// POST route to upvote and downvote recipes
router.route('/recipes/:recipeID/vote')
  .post(tokenAuth, VotesController.votes);

/**
 * @description Page Not Found route
 */
router.all('*', (request, response) => {
  response.status(404).json({
    status: 'Failed',
    message: 'Page not found'
  });
});

export default router;
