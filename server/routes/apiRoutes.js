import express from 'express';
import UserValidation from '../middleware/validations/users';
import UserController from '../controllers/users';
import RecipesValidation from '../middleware/validations/recipes';
import RecipesController from '../controllers/recipes';
import tokenAuth from '../middleware/authToken';

const router = express.Router();

// POST route for users signup
router.route('/users/signup')
    .post(UserValidation.signup, UserController.signup);

// POST route for users signin
router.route('/users/signin')
    .post(UserValidation.signin, UserController.signin);

// POST and GET routes to add and get recipes
router.route('/recipes')
    .post(tokenAuth, RecipesValidation.addRecipeValidation, RecipesController.addRecipe)
    .get(RecipesValidation.getSortdedRecipesValidation, RecipesController.getRecipes);

// PUT and DELETE routes to modify/update and delete recipes
router.route('/recipes/:recipeID')
    .put(tokenAuth, RecipesController.UpdateRecipe)
    .delete(tokenAuth, RecipesController.deleteRecipe);


export default router;