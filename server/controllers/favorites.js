import models from '../models';

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
      return Favorites.findOne({ where: { userId, recipeId } }).then((favorite) => {
        if (favorite) {
          return response.status(400).json({
            status: 'Failed',
            message: 'Recipe already favorited'
          });
        }

        return Favorites.create({
          userId,
          recipeId
        }).then(favoritedRecipe => response.status(201).json({
          status: 'Success',
          message: 'Recipe favorited',
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

    Users.findById(userId).then((userFound) => {
      if (!userFound) {
        return response.status(404).json({
          status: 'Failed',
          message: 'Sorry!!! User not found or has been deleted'
        });
      }
    });
    Favorites.findAll({
      where: { userId },
      include: [{
        model: Recipes,
        attributes: ['id', 'title', 'recipeImage', 'viewsCount', 'userId'],
        include: [{
          model: Users,
          attributes: ['fullName']
        }]
      }],
      order: [
        ['createdAt', 'DESC']
      ]
    }).then((favorites) => {
      if (favorites.length === 0) {
        return response.status(404).json({
          status: 'Failed',
          message: 'You have no available favorite recipes',
        });
      }
      return response.status(200).json({
        status: 'Success',
        message: 'Successfully retrieved your favorite Recipe(s)',
        favorites
      });
    }).catch(error => (
      response.status(500).json({
        status: 'Failed',
        message: error.message
      })
    ));
  }
}
