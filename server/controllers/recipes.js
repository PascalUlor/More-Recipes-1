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
            res.json({ failure: 'Unable to add new recipe' });
        }
    }

    /**
     * Validates all recipe details before allowing access to database
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} insertion error messages or success message
     */
    static updateRecipe(req, res) {
        const { title, ingredients, directions } = req.body;
        for (let i = 0; i < recipesData.length; i += 1) {
            if (recipesData[i].id === parseInt(req.params.id, 10)) {
                if (title || ingredients || directions) {
                    recipesData[i].title = (title) || recipesData[i].title;
                    recipesData[i].ingredients = (ingredients) || recipesData[i].ingredients;
                    recipesData[i].directions = (directions) || recipesData[i].directions;
                    res.status(200);
                    res.json({
                        message: 'Update was successful',
                        recipesData
                    });
                } else {
                    res.status(409);
                    res.json({ message: 'Specify data to update' });
                }
            }
        }
        res.status(409);
        res.json({ message: 'Wrong recipe ID parameter' });
    }

    /**
     * Validates all recipe details before allowing access to database
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} insertion error messages or success message
     */
    static deleteRecipe(req, res) {
        if (parseInt(req.params.id, 10) in recipesData.map(recipe => recipe.id)) {
            const newRecipeCatalog = recipesData.filter(recipe => recipe.id !== parseInt(req.params.id, 10));
            res.status(200);
            res.json({
                message: 'Delete was successful',
                newRecipeCatalog
            });
        } else {
            res.status(409);
            res.json({ message: 'Wrong recipe ID parameter' });
        }
    }

    /**
     * Validates all recipe details before allowing access to database
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} insertion error messages or success message
     */
    static getRecipes(req, res) {
        if (recipesData.length !== 0) {
            res.status(200);
            res.json({ recipesData });
        } else {
            res.status(400);
            res.json({ message: 'There are no available recipes' });
        }
    }
}