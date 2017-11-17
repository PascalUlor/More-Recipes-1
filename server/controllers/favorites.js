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
        const { userId } = request.decoded,
            recipeId = request.params.recipeID;

        return Recipes.findById(recipeId).then((recipeFound) => {
            if (!recipeFound) {
                response.status(400).json({
                    status: 'Failed',
                    message: `Recipe with id: ${recipeId}, not found`
                });
            }
            if (recipeFound.userId === userId) {
                response.status(400).json({
                    status: 'Failed',
                    message: 'Can not favorite a recipe created by you'
                });
            }
            return Favorites.findOne({ where: { userId, recipeId } }).then((favorite) => {
                if (favorite) {
                    return response.status(400).json({
                        status: 'Failed',
                        message: `Recipe with id: ${recipeId} has already been favorited`
                    });
                }

                return Favorites.create({
                    userId,
                    recipeId
                }).then(favoritedRecipe => response.status(201).json({
                    status: 'Success',
                    message: 'Successfully favorited recipe',
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
        const userId = request.params.userID;

        return Users.findById(userId).then((userFound) => {
            if (!userFound) {
                response.status(400).json({
                    status: 'Failed',
                    message: `User with id: ${userId}, not found`
                });
            }
            return Favorites.findAll({
                where: { userId },
                include: [
                    { model: Recipes }
                ]
            }).then((favorites) => {
                if (favorites.length === 0) {
                    response.status(404).json({
                        status: 'Failed',
                        message: 'You have no available favorite recipes',
                    });
                }
                response.status(200).json({
                    status: 'Success',
                    message: 'Successfully retrieved user favorite Recipe(s)',
                    favorites
                });
            }).catch(error => response.status(500).json({
                status: 'Failed',
                message: error.message
            }));
        });
    }
}