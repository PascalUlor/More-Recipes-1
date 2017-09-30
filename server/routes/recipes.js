import express from 'express';
import Validation from '../middleware/validations';
import RecipesController from '../controllers/recipes';

const router = express.Router();

// Route for all recipe verbs
router.route('/recipes')
    .get(RecipesController.getRecipes)
    .post(Validation.addRecipeValidation, RecipesController.addRecipe);

router.route('/recipes/:id')
    .put(RecipesController.updateRecipe)
    .delete(RecipesController.deleteRecipe);

router.route('recipes/:id/reviews')
    .post(RecipesController.postReview);

export default router;