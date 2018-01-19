import models from '../models';
import checkId from '../utils/checkId';
import fetchRecipes from '../utils/recipes';
import requestFeedback from '../utils/requestFeedback';

const { Users, Recipes, Favorites } = models;


/**
 * Class Definition for the user's favorite recipes
 * @class FavoritesApiController
 */
export default class FavoritesApiController {
  /**
   * Add a recipe to user's favorite recipes catalog
   * @memberof FavoritesApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} failure response messages object or success message object with data persisted to the database
   */
  static addToFavorite(request, response) {
    const { userId } = request.decoded, recipeId = parseInt(request.params.recipeID.trim(), 10);

    if (checkId.recipeId(response, recipeId)) {
      Recipes.findById(recipeId).then((recipeFound) => {
        if (!recipeFound) {
          return requestFeedback.error(response, 404, 'Recipe not found or has been deleted');
        }
        if (recipeFound.userId === userId) {
          return requestFeedback.error(response, 403, 'Can not favorite a recipe created by you');
        }
        Favorites.findOne({ where: { userId, recipeId } }).then((favorite) => {
          if (favorite) {
            return Favorites.destroy({
              where: { userId, recipeId }
            }).then(() => requestFeedback.success(response, 200, 'Recipe has been unfavorited'));
          }
          return Favorites.create({
              userId,
              recipeId
            }).then(favoritedRecipe => requestFeedback.success(response, 201, 'Recipe has been favorited', { favoritedRecipe }))
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
   * @returns {object} failure response messages object or success message object with persisted database data
   */
  static getFavoriteRecipes(request, response) {
    const { userId } = request.decoded;

    const message1 = 'You have no favorited recipes',
      message2 = 'Successfully retrieved your favorite Recipe(s)';
    fetchRecipes(request, response, Recipes, Users, Favorites, userId, 'updatedAt', 'DESC', message1, message2);
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
    const { userId } = request.decoded, recipeId = parseInt(request.params.recipeID.trim(), 10);

    if (checkId.recipeId(response, recipeId)) {
      Favorites.findOne({ where: { userId, recipeId } }).then((recipeFound) => {
        if (!recipeFound) {
          return requestFeedback.error(response, 404, 'Recipe not found or has been deleted');
        }
        return Favorites.destroy({
            where: { userId, recipeId }
          }).then(recipe => requestFeedback.success(response, 200, 'Successfully deleted Recipe', { recipe }))
          .catch(error => requestFeedback.error(response, 500, error.message));
      });
    }
  }
}
