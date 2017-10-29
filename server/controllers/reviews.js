import models from '../models';

const { Recipes, Reviews } = models;


/**
 * Class Definition for the Review Route
 * @class ReviewsApiController
 */
export default class ReviewsApiController {
    /**
     * Post a review for a recipe
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} insertion error messages or success message
     * @memberof ReviewsApiController
     */
    static postReview(req, res) {
        const { reviewBody } = req.body, { userId } = req.decoded,
            recipeId = req.params.recipeID;

        return Recipes.findById(recipeId).then((recipe) => {
            if (!recipe) {
                res.status(400).json({
                    status: 'Failed',
                    message: `Recipe with id: ${recipeId}, not found`
                });
            }
            if (recipe.userId === userId) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Can not post a review for a recipe created by you'
                });
            }
            return Reviews.create({
                reviewBody,
                userId,
                recipeId
            }).then(postedReview => res.status(201).json({
                status: 'Success',
                message: `Successfully posted a review for recipe with id:${recipeId}`,
                postedReview
            })).catch(error => res.status(500).json({
                status: 'Failed',
                message: error.message
            }));
        });
    }
}