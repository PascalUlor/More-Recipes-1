import models from '../models';

const { Recipes, Reviews } = models;


/**
 * Class Definition for the Review Route
 * @class ReviewsApiController
 */
export default class ReviewsApiController {
    /**
     * Post a review for a recipe
     * @memberof ReviewsApiController
     * @static
     *
     * @param   {object} request   the server/http(s) request object
     * @param   {object} response  the server/http(s) response object
     *
     * @returns {object} insertion error messages object or success message object
     */
    static postReview(request, response) {
        const { reviewBody } = request.body, { userId } = request.decoded,
            recipeId = parseInt(request.params.recipeID.trim(), 10);

        return Recipes.findById(recipeId).then((recipe) => {
            if (!recipe) {
                return response.status(400).json({
                    status: 'Failed',
                    message: `Recipe with id: ${recipeId}, not found`
                });
            }
            if (recipe.userId === userId) {
                return response.status(400).json({
                    status: 'Failed',
                    message: 'Can not post a review for a recipe created by you'
                });
            }
            return Reviews.create({
                reviewBody,
                userId,
                recipeId
            }).then(postedReview => response.status(201).json({
                status: 'Success',
                message: `Successfully posted a review for recipe with id:${recipeId}`,
                postedReview
            })).catch(error => response.status(500).json({
                status: 'Failed',
                message: error.message
            }));
        });
    }
}