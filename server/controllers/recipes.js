import recipesData from '../models/recipes';
import reviewsData from '../models/reviews';

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
        let newRecipeId;

        if (recipesData.length === 0) {
            newRecipeId = 1;
        } else {
            newRecipeId = (recipesData[recipesData.length - 1].id) + 1;
        }

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
            res.status(201);
            res.json({
                status: 'Success',
                message: 'Successfully added new recipe',
                recipesData
            });
        } catch (e) {
            res.status(500);
            res.json({
                status: 'Failed',
                message: 'Error adding new recipe'
            });
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
            if (!req.query.sort) {
                res.status(200);
                res.json({ recipesData });
            } else if (req.query.sort === 'upvotes') {
                if (req.query.order === 'des') {
                    recipesData.sort((a, b) => b.upvotes - a.upvotes);
                    res.status(200);
                    res.json({ recipesData });
                } else {
                    recipesData.sort((a, b) => a.upvotes - b.upvotes);
                    res.status(200);
                    res.json({ recipesData });
                }
            } else if (req.query.order === 'des') {
                recipesData.sort((a, b) => b.downvotes - a.downvotes);
                res.status(200);
                res.json({ recipesData });
            } else {
                recipesData.sort((a, b) => a.downvotes - b.downvotes);
                res.status(200);
                res.json({ recipesData });
            }
        } else {
            res.status(400);
            res.json({ message: 'There are no available recipes' });
        }
    }

    /**
     * Validates all recipe details before allowing access to database
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} insertion error messages or success message
     */
    static postReview(req, res) {
        let newReviewId;

        if (recipesData.length === 0) {
            newReviewId = 1;
        } else {
            newReviewId = (reviewsData[reviewsData.length - 1].id) + 1;
        }

        try {
            if (parseInt(req.params.id, 10) in recipesData.map(recipe => recipe.id)) {
                reviewsData.push({
                    id: newReviewId,
                    reviewSubject: req.body.reviewSubject,
                    vote: req.body.vote,
                    userId: 3,
                    recipeId: 1
                });
                res.status(200);
                res.json({
                    message: 'Successfully added review',
                    reviewsData
                });
            } else {
                res.status(409);
                res.json({ message: 'Wrong recipe ID parameter' });
            }
        } catch (e) {
            res.status(400);
            res.json({ message: 'Unable to add review' });
        }
    }
}