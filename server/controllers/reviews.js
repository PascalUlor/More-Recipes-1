import models from '../models';

const { Recipes, Reviews, Users } = models;


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

    Users.findById(userId)
      .then((foundUser) => {
        if (!foundUser) {
          return response.status(404).json({
            status: 'Failed',
            message: 'Sorry!!! User not found or has been deleted'
          });
        }
        if (Number.isNaN(recipeId)) {
          return response.status(406).json({
            status: 'Failed',
            message: 'Recipe ID must be a number'
          });
        }
        return Recipes.findById(recipeId).then((recipe) => {
          if (!recipe) {
            return response.status(404).json({
              status: 'Failed',
              message: 'Sorry!!! Recipe not found or has been deleted'
            });
          }
          return Reviews.create({
            reviewBody,
            username: foundUser.username,
            profileImage: foundUser.profileImage,
            userId,
            recipeId
          }).then(postedReview => response.status(201).json({
            status: 'Success',
            message: 'Successfully posted review',
            postedReview
          })).catch(error => response.status(500).json({
            status: 'Failed',
            message: error.message
          }));
        });
      });
  }
}
