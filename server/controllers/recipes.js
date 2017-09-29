import recipesData from '../models/recipes';

/**
 * Class implementation for /api/recipes routes
 * @class RecipesApiController
 */
export default class RecipesApiController {
    /**
     * Validates all recipe details before allowing access to database
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} insertion error messages or success message
     */
    static addRecipe(req, res) {
        // const { title, ingredients, directions } = req.body;
        let idOfLastItem;

        if (recipesData.length === 0) {
            idOfLastItem = 0;
        } else {
            idOfLastItem = recipesData[recipesData.length - 1].id;
        }
        const newRecipeId = idOfLastItem + 1;

        try {
            recipesData.push({
                id: newRecipeId,
                title: req.body.title,
                ingredients: req.body.ingredients,
                directions: req.body.directions,
                upvotes: 0,
                downvotes: 0,
                userId: 3,
            });
            res.json({ success: 'Successfully posted new item' });
        } catch (e) {
            res.json({ failure: 'Unable to post new recipe' });
        }
    }
}