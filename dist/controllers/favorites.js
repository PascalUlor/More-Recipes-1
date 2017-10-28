'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class Definition for the user's favorite recipes
 * @class FavoriteRecipes
 */
var FavoriteRecipes = function () {
    function FavoriteRecipes() {
        _classCallCheck(this, FavoriteRecipes);
    }

    _createClass(FavoriteRecipes, null, [{
        key: 'addToFavorite',

        /**
         * Add a recipe to user's favorite table
         * @param {object} req
         * @param {object} res
         * @returns {object} Failure response messages or Success message with data persisted to the database
         */
        value: function addToFavorite(req, res) {
            var userId = req.decoded.userId;

            var recipeId = req.params.recipeID;

            _models2.default.Recipes.findById(recipeId).then(function (recipeFound) {
                if (recipeFound) {
                    _models2.default.Favorites.findOrCreate({ where: { userId: userId, recipeId: recipeId } }).spread(function (recipeAdded, created) {
                        if (created) {
                            res.status(201).json({
                                status: 'Success',
                                message: 'Successfully added recipe to your favorites'
                            });
                        } else {
                            res.status(400).json({
                                status: 'Failed',
                                message: 'Recipe with id: ' + recipeId + ' already added'
                            });
                        }
                    }).catch(function (err) {
                        if (err) {
                            res.status(500).json({
                                status: 'Failed',
                                message: 'Error adding recipe to your favorites'
                            });
                        }
                    });
                } else {
                    return res.status(400).json({
                        status: 'Failed',
                        message: 'Recipe with id: ' + recipeId + ' is not available'
                    });
                }
            });
        }

        /**
         * Get all user's favorite recipes
         * @param {object} req
         * @param {object} res
         * @returns {object} Failure response messages or Success message with persisted database data
         */

    }, {
        key: 'getFavoriteRecipes',
        value: function getFavoriteRecipes(req, res) {
            var userId = req.params.userID;

            _models2.default.Users.findById(userId).then(function (userFound) {
                if (userFound) {
                    _models2.default.Favorites.findAll({
                        where: { userId: userId },
                        include: [{ model: _models2.default.Recipes }]
                    }).then(function (favorites) {
                        if (favorites) {
                            res.status(201).json({
                                status: 'Success',
                                message: 'Successfully retrieved user\'s favorite Recipe(s)',
                                favorites: favorites
                            });
                        } else {
                            res.status(201).json({
                                status: 'Failed',
                                message: 'No available favorite recipe'
                            });
                        }
                    }).catch(function (err) {
                        if (err) {
                            res.status(500).json({
                                status: 'Failed',
                                message: 'Error retrieving user\'s favorite recipes'
                            });
                        }
                    });
                } else {
                    res.status(400).json({
                        status: 'Failed',
                        message: 'User with id: ' + userId + ' does not exist'
                    });
                }
            });
        }
    }]);

    return FavoriteRecipes;
}();

exports.default = FavoriteRecipes;