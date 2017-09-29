import express from 'express';
import Validation from '../middleware/validations';
import RecipesController from '../controllers/recipes';

const router = express.Router();

// Route for all recipe verbs
router.route('/recipes')
    .post(Validation.addRecipeValidation, RecipesController.addRecipe);


export default router;