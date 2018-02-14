import models from '../models';
import checkId from '../utils/checkId';
import fetchRecipes from '../utils/recipes';
import requestFeedback from '../utils/requestFeedback';

const { User, Recipe, Favorite } = models;


/**
 * Class Definition for the user's favorite recipes
 * @class FavoriteApiController
 */
export default class FavoriteApiController {
  /**
   * Add a recipe to user's favorite recipes catalog
   * @memberof FavoritesApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} failure response messages object or success
   * message object with data persisted to the database
   */
  static addToFavorite(request, response) {
    const { userId } = request.decoded,
      recipeId = parseInt(request.params.recipeID.trim(), 10);

    if (checkId.recipeId(response, recipeId)) {
      Recipe.findById(recipeId).then((recipeFound) => {
        if (!recipeFound) {
          return requestFeedback
            .error(response, 404, 'Recipe not found or has been deleted');
        }
        if (recipeFound.userId === userId) {
          return requestFeedback
            .error(response, 403, 'Can not favorite a recipe created by you');
        }
        Favorite.findOne({ where: { userId, recipeId } }).then((favorite) => {
          if (favorite) {
            return Favorite.destroy({
              where: { userId, recipeId }
            }).then(() => requestFeedback
              .success(response, 200, 'Recipe has been unfavorited'));
          }
          return Favorite.create({ userId, recipeId })
            .then(favoritedRecipe => requestFeedback
              .success(response, 201, 'Recipe has been favorited', {
                favoritedRecipe
              }))
            .catch(error => requestFeedback.error(response, 500, error.message));
        }).catch(error => requestFeedback.error(response, 500, error.message));
      }).catch(error => requestFeedback.error(response, 500, error.message));
    }
  }

  /**
   * Get all user's favorite recipes from the catalog
   * @memberof FavoritesApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} failure response messages object or
   * success message object with persisted database data
   */
  static getFavoriteRecipes(request, response) {
    const { userId } = request.decoded;

    const message1 = 'You have no favorited recipes',
      message2 = 'Successfully retrieved your favorite Recipe(s)';
    fetchRecipes(
      request, response, Recipe, User, Favorite,
      userId, 'updatedAt', 'DESC', message1, message2
    );
  }

  /**
   * @description Delete a user favorite recipe
   * @memberof FavoritesApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} failure response messages object or success message object
   */
  static deleteFavoriteRecipe(request, response) {
    const { userId } = request.decoded,
      recipeId = parseInt(request.params.recipeID.trim(), 10);

    if (checkId.recipeId(response, recipeId)) {
      Favorite.findOne({ where: { userId, recipeId } }).then((recipeFound) => {
        if (!recipeFound) {
          return requestFeedback
            .error(response, 404, 'Recipe not found or has been deleted');
        }
        return Favorite.destroy({ where: { userId, recipeId } })
          .then(() => requestFeedback
            .success(response, 200, 'Successfully deleted Recipe'))
          .catch(() => requestFeedback
            .error(response, 500, 'Internal server error'));
      });
    }
  }
}
