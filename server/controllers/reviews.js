import models from '../models';

/**
 * Class Definition for the Review Route
 * @class Review
 */
export default class Review {
    /**
     * Post a review on a recipe
     * @param {object} req
     * @param {object} res
     * @returns {object} insertion error messages or success messages
     */
    static postReview(req, res) {
        const { reviewBody } = req.body, { userId } = req.decoded,
            recipeId = req.params.recipeID;

        models.Recipes
            .findById(recipeId)
            .then((recipe) => {
                if (recipe) {
                    if (recipe.userId === userId) {
                        return res.status(400)
                            .json({
                                status: 'Failed',
                                message: 'You can not post a review for a recipe created by you'
                            });
                    }
                    models.Reviews
                        .create({
                            reviewBody,
                            userId,
                            recipeId
                        })
                        .then((postedReview) => {
                            res.status(201).json({
                                status: 'Success',
                                message: `Successfully posted a review for recipe with id:${recipeId}`,
                                postedReview
                            });
                        })
                        .catch((err) => {
                            if (err) {
                                res.status(500).json({ message: 'Error posting review' });
                            }
                        });
                } else {
                    return res.status(400).json({
                        status: 'Failed',
                        message: `Recipe with id: ${recipeId}, is not available`
                    });
                }
            });
    }
}