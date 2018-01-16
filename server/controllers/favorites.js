import models from '../models';
import checkId from '../utils/checkId';
import fetchRecipes from '../utils/recipes';

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

    if (Number.isNaN(recipeId)) {
      return response.status(406).json({
        status: 'Failed',
        message: 'Recipe ID must be a number'
      });
    }

    Recipes.findById(recipeId).then((recipeFound) => {
      if (!recipeFound) {
        return response.status(404).json({
          status: 'Failed',
          message: 'Sorry!!! Recipe not found or has been deleted'
        });
      }
      if (recipeFound.userId === userId) {
        return response.status(403).json({
          status: 'Failed',
          message: 'Can not favorite a recipe created by you'
        });
      }
      Favorites.findOne({ where: { userId, recipeId } }).then((favorite) => {
        if (favorite) {
          return Favorites.destroy({
            where: { userId, recipeId }
          }).then(() => response.status(200).json({
            status: 'Success',
            message: 'Recipe has been unfavorited'
          }));
        }
        return Favorites.create({
          userId,
          recipeId
        }).then(favoritedRecipe => response.status(201).json({
          status: 'Success',
          message: 'Recipe has been favorited',
          favoritedRecipe
        })).catch(error => response.status(500).json({
          status: 'Failed',
          message: error.message
        }));
      }).catch(error => response.status(500).json({
        status: 'Failed',
        message: error.message
      }));
    }).catch(error => response.status(500).json({
      status: 'Failed',
      message: error.message
    }));
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
    checkId.userId(response, Users, userId);

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

    if (Number.isNaN(recipeId)) {
      return response.status(406).json({
        status: 'Failed',
        message: 'Recipe ID must be a number'
      });
    }
    return Favorites.destroy({
      where: { userId, recipeId }
    }).then(() => response.status(200).json({
      status: 'Success',
      message: 'Recipe has been deleted'
    })).catch(error => response.state(500).json({
      status: 'Failed',
      message: error.message
    }));
  }
}
