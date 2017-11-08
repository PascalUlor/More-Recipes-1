import express from 'express';
import UserValidation from '../middleware/validations/users';
import UserController from '../controllers/users';
import RecipesValidation from '../middleware/validations/recipes';
import RecipesController from '../controllers/recipes';
import ReviewsValidation from '../middleware/validations/reviews';
import ReviewsController from '../controllers/reviews';
import FavoritesController from '../controllers/favorites';
import tokenAuth from '../middleware/authToken';

const router = express.Router();


/**
 * User signup and sign in routes
 */
router.route('/users/signup')
    .post(UserValidation.signup, UserController.signup);
router.route('/users/signin')
    .post(UserValidation.signin, UserController.signin);

/**
 * Recipe routes
 */
// POST and GET routes to add a recipe and get recipes(sorted or not sorted formats)
router.route('/recipes')
    .post(tokenAuth, RecipesValidation.addRecipeValidations, RecipesController.addRecipe)
    .get(RecipesValidation.getSortdedRecipesValidation, RecipesController.getRecipes);
// PUT and DELETE routes to modify/update and delete a recipe
router.route('/recipes/:recipeID')
    .put(tokenAuth, RecipesValidation.updateRecipeValidations, RecipesController.updateRecipe)
    .delete(tokenAuth, RecipesController.deleteRecipe);

/**
 * Recipe review routes
 */
// POST route to create/add a review for a recipe
router.route('/recipes/:recipeID/reviews')
    .post(tokenAuth, ReviewsValidation.postReviewValidations, ReviewsController.postReview);

/**
 * Recipe favorite routes
 */
// POST route to create/add user's favorite recipes
router.route('/users/:recipeID/recipes')
    .post(tokenAuth, FavoritesController.addToFavorite);
// GET route to retrieve user's favorite recipes
router.route('/users/:userID/recipes')
    .get(tokenAuth, FavoritesController.getFavoriteRecipes);


export default router;