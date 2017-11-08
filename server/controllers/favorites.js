import models from '../models';

const { Users, Recipes, Favorites } = models;


/**
 * Class Definition for the user's favorite recipes
 * @class FavoritesApiController
 */
export default class FavoritesApiController {
    /**
     * Add a recipe to user's favorite catalog
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure response messages or Success message with data persisted to the database
     * @memberof FavoritesApiController
     */
    static addToFavorite(req, res) {
        const { userId } = req.decoded,
            recipeId = req.params.recipeID;

        return Recipes.findById(recipeId).then((recipeFound) => {
            if (!recipeFound) {
                res.status(400).json({
                    status: 'Failed',
                    message: `Recipe with id: ${recipeId}, not found`
                });
            }
            if (recipeFound.userId === userId) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Can not favorite a recipe created by you'
                });
            }
            return Favorites.findOne({ where: { userId, recipeId } }).then((favorite) => {
                if (favorite) {
                    return res.status(400).json({
                        status: 'Failed',
                        message: `Recipe with id: ${recipeId} has already been favorited`
                    });
                }

                return Favorites.create({
                    userId,
                    recipeId
                }).then(favoritedRecipe => res.status(201).json({
                    status: 'Success',
                    message: 'Successfully favorited recipe',
                    favoritedRecipe
                })).catch(error => res.status(500).json({
                    status: 'Failed',
                    message: error.message
                }));
            }).catch(error => res.status(500).json({
                status: 'Failed',
                message: error.message
            }));
        }).catch(error => res.status(500).json({
            status: 'Failed',
            message: error.message
        }));
    }

    /**
     * Get all user's favorite recipes
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure response messages or Success message with persisted database data
     * @memberof FavoritesApiController
     */
    static getFavoriteRecipes(req, res) {
        const userId = req.params.userID;

        return Users.findById(userId).then((userFound) => {
            if (!userFound) {
                res.status(400).json({
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
                    res.status(404).json({
                        status: 'Failed',
                        message: 'You have no available favorite recipes',
                    });
                }
                res.status(200).json({
                    status: 'Success',
                    message: 'Successfully retrieved user favorite Recipe(s)',
                    favorites
                });
            }).catch(error => res.status(500).json({
                status: 'Failed',
                message: error.message
            }));
        });
    }
}