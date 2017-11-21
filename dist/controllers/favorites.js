'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = _models2.default.Users,
    Recipes = _models2.default.Recipes,
    Favorites = _models2.default.Favorites;

/**
 * Class Definition for the user's favorite recipes
 * @class FavoritesApiController
 */

var FavoritesApiController = function () {
    function FavoritesApiController() {
        _classCallCheck(this, FavoritesApiController);
    }

    _createClass(FavoritesApiController, null, [{
        key: 'addToFavorite',

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
        value: function addToFavorite(request, response) {
            var userId = request.decoded.userId,
                recipeId = parseInt(request.params.recipeID.trim(), 10);

            if (Number.isNaN(recipeId)) {
                return response.status(406).json({
                    status: 'Failed',
                    message: 'Recipe ID must be a number'
                });
            }

            return Recipes.findById(recipeId).then(function (recipeFound) {
                if (!recipeFound) {
                    response.status(404).json({
                        status: 'Failed',
                        message: 'Recipe with id: ' + recipeId + ', not found'
                    });
                }
                if (recipeFound.userId === userId) {
                    response.status(403).json({
                        status: 'Failed',
                        message: 'Can not favorite a recipe created by you'
                    });
                }
                return Favorites.findOne({ where: { userId: userId, recipeId: recipeId } }).then(function (favorite) {
                    if (favorite) {
                        return response.status(400).json({
                            status: 'Failed',
                            message: 'Recipe with id: ' + recipeId + ' has already been favorited'
                        });
                    }

                    return Favorites.create({
                        userId: userId,
                        recipeId: recipeId
                    }).then(function (favoritedRecipe) {
                        return response.status(201).json({
                            status: 'Success',
                            message: 'Successfully favorited recipe',
                            favoritedRecipe: favoritedRecipe
                        });
                    }).catch(function (error) {
                        return response.status(500).json({
                            status: 'Failed',
                            message: error.message
                        });
                    });
                }).catch(function (error) {
                    return response.status(500).json({
                        status: 'Failed',
                        message: error.message
                    });
                });
            }).catch(function (error) {
                return response.status(500).json({
                    status: 'Failed',
                    message: error.message
                });
            });
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

    }, {
        key: 'getFavoriteRecipes',
        value: function getFavoriteRecipes(request, response) {
            var userId = parseInt(request.params.userID.trim(), 10);

            if (Number.isNaN(userId)) {
                return response.status(406).json({
                    status: 'Failed',
                    message: 'User ID must be a number'
                });
            }

            return Users.findById(userId).then(function (userFound) {
                if (!userFound) {
                    response.status(404).json({
                        status: 'Failed',
                        message: 'User with id: ' + userId + ', not found'
                    });
                }
                return Favorites.findAll({
                    where: { userId: userId },
                    include: [{ model: Recipes }]
                }).then(function (favorites) {
                    if (favorites.length === 0) {
                        response.status(404).json({
                            status: 'Failed',
                            message: 'You have no available favorite recipes'
                        });
                    }
                    response.status(200).json({
                        status: 'Success',
                        message: 'Successfully retrieved user favorite Recipe(s)',
                        favorites: favorites
                    });
                }).catch(function (error) {
                    return response.status(500).json({
                        status: 'Failed',
                        message: error.message
                    });
                });
            });
        }
    }]);

    return FavoritesApiController;
}();

exports.default = FavoritesApiController;