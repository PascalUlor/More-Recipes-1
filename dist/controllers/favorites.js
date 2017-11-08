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
         * Add a recipe to user's favorite catalog
         * @static
         * @param {object} req
         * @param {object} res
         * @returns {object} Failure response messages or Success message with data persisted to the database
         * @memberof FavoritesApiController
         */
        value: function addToFavorite(req, res) {
            var userId = req.decoded.userId,
                recipeId = req.params.recipeID;


            return Recipes.findById(recipeId).then(function (recipeFound) {
                if (!recipeFound) {
                    res.status(400).json({
                        status: 'Failed',
                        message: 'Recipe with id: ' + recipeId + ', not found'
                    });
                }
                if (recipeFound.userId === userId) {
                    res.status(400).json({
                        status: 'Failed',
                        message: 'Can not favorite a recipe created by you'
                    });
                }
                return Favorites.findOne({ where: { userId: userId, recipeId: recipeId } }).then(function (favorite) {
                    if (favorite) {
                        return res.status(400).json({
                            status: 'Failed',
                            message: 'Recipe with id: ' + recipeId + ' has already been favorited'
                        });
                    }

                    return Favorites.create({
                        userId: userId,
                        recipeId: recipeId
                    }).then(function (favoritedRecipe) {
                        return res.status(201).json({
                            status: 'Success',
                            message: 'Successfully favorited recipe',
                            favoritedRecipe: favoritedRecipe
                        });
                    }).catch(function (error) {
                        return res.status(500).json({
                            status: 'Failed',
                            message: error.message
                        });
                    });
                }).catch(function (error) {
                    return res.status(500).json({
                        status: 'Failed',
                        message: error.message
                    });
                });
            }).catch(function (error) {
                return res.status(500).json({
                    status: 'Failed',
                    message: error.message
                });
            });
        }

        /**
         * Get all user's favorite recipes
         * @static
         * @param {object} req
         * @param {object} res
         * @returns {object} Failure response messages or Success message with persisted database data
         * @memberof FavoritesApiController
         */

    }, {
        key: 'getFavoriteRecipes',
        value: function getFavoriteRecipes(req, res) {
            var userId = req.params.userID;

            return Users.findById(userId).then(function (userFound) {
                if (!userFound) {
                    res.status(400).json({
                        status: 'Failed',
                        message: 'User with id: ' + userId + ', not found'
                    });
                }
                return Favorites.findAll({
                    where: { userId: userId },
                    include: [{ model: Recipes }]
                }).then(function (favorites) {
                    if (favorites.length === 0) {
                        res.status(404).json({
                            status: 'Failed',
                            message: 'You have no available favorite recipes'
                        });
                    }
                    res.status(200).json({
                        status: 'Success',
                        message: 'Successfully retrieved user favorite Recipe(s)',
                        favorites: favorites
                    });
                }).catch(function (error) {
                    return res.status(500).json({
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