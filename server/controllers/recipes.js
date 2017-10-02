import recipesData from '../models/recipes';
import reviewsData from '../models/reviews';

/**
 * Class implementation for /api/recipes routes
 * @class RecipesApiController
 */
export default class RecipesApiController {
    /**
     * Add recipe to recipes model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
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
                description: req.body.description,
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
     * Updates a particular recipe in the recipes model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     */
    static updateRecipe(req, res) {
        const { title, ingredients, description } = req.body;
        for (let i = 0; i < recipesData.length; i += 1) {
            if (recipesData[i].id === parseInt(req.params.id, 10)) {
                if (title || ingredients || description) {
                    recipesData[i].title = (title) || recipesData[i].title;
                    recipesData[i].ingredients = (ingredients) || recipesData[i].ingredients;
                    recipesData[i].description = (description) || recipesData[i].description;
                    res.status(200);
                    res.json({
                        status: 'Success',
                        message: 'Update was successful',
                        recipesData
                    });
                } else {
                    res.status(400);
                    res.json({
                        status: 'Failed',
                        message: 'Specify data to update'
                    });
                }
            }
        }
        res.status(400);
        res.json({
            status: 'Failed',
            message: 'Recipe ID parameter does not exist'
        });
    }

    /**
     * Deletes a particular recipe from the recipes model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     */
    static deleteRecipe(req, res) {
        if (parseInt(req.params.id, 10) in recipesData.map(recipe => recipe.id)) {
            const newRecipeCatalog = recipesData.filter(recipe => recipe.id !== parseInt(req.params.id, 10));
            res.status(200);
            res.json({
                status: 'Success',
                message: 'Delete was successful',
                newRecipeCatalog
            });
        } else {
            res.status(404);
            res.json({
                status: 'Failed',
                message: 'Recipe ID parameter does not exist'
            });
        }
    }

    /**
     * Retrieves all available recipes from the recipes model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     */
    static getRecipes(req, res) {
        if (recipesData.length !== 0) {
            if (!req.query.sort) {
                res.status(200);
                res.json({
                    status: 'Success',
                    message: 'Successfully retrieved all available recipes',
                    recipesData
                });
            } else if (req.query.sort === 'upvotes') {
                if (req.query.order === 'des') {
                    recipesData.sort((a, b) => b.upvotes - a.upvotes);
                    res.status(200);
                    res.json({
                        status: 'Success',
                        message: 'Successfully retrieved all available sorted recipes',
                        recipesData
                    });
                } else {
                    recipesData.sort((a, b) => a.upvotes - b.upvotes);
                    res.status(200);
                    res.json({
                        status: 'Success',
                        message: 'Successfully retrieved all available sorted recipes',
                        recipesData
                    });
                }
            } else if (req.query.order === 'des') {
                recipesData.sort((a, b) => b.downvotes - a.downvotes);
                res.status(200);
                res.json({
                    status: 'Success',
                    message: 'Successfully retrieved all available sorted recipes',
                    recipesData
                });
            } else {
                recipesData.sort((a, b) => a.downvotes - b.downvotes);
                res.status(200);
                res.json({
                    status: 'Success',
                    message: 'Successfully retrieved all available sorted recipes',
                    recipesData
                });
            }
        } else {
            res.status(404);
            res.json({
                status: 'Failed',
                message: 'There are no available recipes'
            });
        }
    }

    /**
     * Adds review for a particular recipe to the reviews model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
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
                    status: 'Success',
                    message: 'Successfully added review',
                    reviewsData
                });
            } else {
                res.status(404);
                res.json({
                    status: 'Failed',
                    message: 'Recipe ID parameter does not exist'
                });
            }
        } catch (e) {
            res.status(500);
            res.json({
                status: 'Failed',
                message: 'Error adding review'
            });
        }
    }
}