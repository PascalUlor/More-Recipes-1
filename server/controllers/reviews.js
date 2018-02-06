import models from '../models';
import requestFeedback from '../utils/requestFeedback';
import reviewNotifier from '../utils/reviewNotifier';

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
   * @param   {object} request  - the server/http(s) request object
   * @param   {object} response - the server/http(s) response object
   *
   * @returns {object} insertion error message object or success message object
   */
  static postReview(request, response) {
    const { reviewBody } = request.body, { userId } = request.decoded,
      recipeId = parseInt(request.params.recipeID.trim(), 10);

    Users.findById(userId).then((foundUser) => {
      Recipes.findById(recipeId).then((foundRecipe) => {
        if (!foundRecipe) {
          return requestFeedback.error(
            response, 404, 'Recipe not found or has been deleted');
        }

        return Reviews.create({
            reviewBody,
            username: foundUser.username,
            profileImage: foundUser.profileImage,
            userId,
            recipeId
          }).then((postedReview) => {
            if (postedReview.userId !== foundRecipe.userId) {
              reviewNotifier(Recipes, Users, recipeId, postedReview, request);
            }
            return requestFeedback.success(response, 201,
              'Successfully posted review', { postedReview });
          })
          .catch(error => (
            requestFeedback.error(response, 500, error.message)));
      });
    });
  }
}
