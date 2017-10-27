import models from '../models';

const { Recipes, Reviews } = models;

/**
 * Class Definition for the Review Route
 * @class ReviewsController
 */
export default class ReviewsController {
    /**
     * Post a review on a recipe
     * @param {object} req
     * @param {object} res
     * @returns {object} insertion error messages or success messages
     */
    static postReview(req, res) {
        const { review } = req.body, { userId } = req.decoded,
            recipeId = req.params.recipeID;

        Recipes.findById(recipeId)
            .then((recipe) => {
                if (recipe) {
                    if (recipe.userId === userId) {
                        res.status(400)
                            .json({
                                status: 'Failed',
                                message: 'Can not post a review for a recipe created by you'
                            });
                    } else {
                        Reviews.create({
                            review,
                            userId,
                            recipeId
                        }).then((postedReview) => {
                            res.status(201)
                                .json({
                                    status: 'Success',
                                    message: `Successfully posted a review for recipe with id:${recipeId}`,
                                    postedReview
                                });
                        }).catch((err) => {
                            if (err) {
                                res.status(500)
                                    .json({ message: 'Error posting review' });
                            }
                        });
                    }
                } else {
                    res.status(400)
                        .json({
                            status: 'Failed',
                            message: `Recipe with id: ${recipeId}, is not available`
                        });
                }
            }).catch((err) => {
                if (err) {
                    res.status(500)
                        .json({
                            status: 'Failed',
                            message: 'Server error occurred'
                        });
                }
            });
    }
}