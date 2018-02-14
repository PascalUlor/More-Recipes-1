import models from '../models';
import requestFeedback from '../utils/requestFeedback';
import reviewNotifier from '../utils/reviewNotifier';

const { Recipe, Review, User } = models;


/**
 * Class Definition for the Review Route
 * @class ReviewApiController
 */
export default class ReviewApiController {
  /**
   * Post a review for a recipe
   * @memberof ReviewApiController
   * @static
   *
   * @param   {object} request  - the server/http(s) request object
   * @param   {object} response - the server/http(s) response object
   *
   * @returns {object} insertion error message object or success message object
   */
  static postReview(request, response) {
    const { reviewBody } = request.body, { userId } = request.decoded,
      recipeId = parseInt(request.params.recipeID.trim(), 10);

    User.findById(userId).then((foundUser) => {
      Recipe.findById(recipeId).then((foundRecipe) => {
        if (!foundRecipe) {
          return requestFeedback
            .error(response, 404, 'Recipe not found or has been deleted');
        }

        return Review.create({
          reviewBody,
          username: foundUser.username,
          profileImage: foundUser.profileImage,
          userId,
          recipeId
        }).then((postedReview) => {
          if (postedReview.userId !== foundRecipe.userId) {
            reviewNotifier(Recipe, User, recipeId, postedReview, request);
          }
          return requestFeedback.success(
            response, 201,
            'Successfully posted review', { postedReview }
          );
        })
          .catch(error => (
            requestFeedback.error(response, 500, error.message)));
      });
    });
  }
}
