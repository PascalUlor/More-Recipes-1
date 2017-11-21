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
    Recipes = _models2.default.Recipes;

/**
 * Class implementation for /api/v1/recipes routes
 * @class RecipesApiController
 */

var RecipesApiController = function () {
    function RecipesApiController() {
        _classCallCheck(this, RecipesApiController);
    }

    _createClass(RecipesApiController, null, [{
        key: 'addRecipe',

        /**
         * Add a recipe to recipes catalog
         * @memberof RecipesApiController
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         *
         * @returns {object} insertion error messages object or success message object
         */
        value: function addRecipe(request, response) {
            var _request$body = request.body,
                title = _request$body.title,
                ingredients = _request$body.ingredients,
                procedures = _request$body.procedures,
                recipeImage = _request$body.recipeImage,
                userId = request.decoded.userId;

            return Users.findById(userId).then(function (foundUser) {
                if (!foundUser) {
                    return response.status(404).json({
                        status: 'Failed',
                        message: 'User not found or may have been deleted'
                    });
                }
                return Recipes.findOne({ where: { title: title, userId: userId } }).then(function (found) {
                    if (found && found.title === title) {
                        return response.status(409).json({
                            status: 'Failed',
                            message: 'Recipe with title:' + title + ', already exist in your catalog'
                        });
                    }

                    return Recipes.create({
                        title: title,
                        ingredients: ingredients,
                        procedures: procedures,
                        recipeImage: recipeImage,
                        userId: userId
                    }).then(function (recipe) {
                        return response.status(201).json({
                            status: 'Success',
                            message: 'Successfully added new recipe',
                            recipe: recipe
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
            });
        }

        /**
         * Modify a recipe in the recipes catalog
         * @memberof RecipesApiController
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         *
         * @returns {object} insertion error messages object or success messages object
         */

    }, {
        key: 'updateRecipe',
        value: function updateRecipe(request, response) {
            var _request$body2 = request.body,
                title = _request$body2.title,
                ingredients = _request$body2.ingredients,
                procedures = _request$body2.procedures,
                recipeImage = _request$body2.recipeImage,
                userId = request.decoded.userId,
                recipeId = parseInt(request.params.recipeID.trim(), 10);


            return Recipes.findById(recipeId).then(function (recipe) {
                if (recipe.userId === userId) {
                    return recipe.updateAttributes({
                        title: title || recipe.title,
                        ingredients: ingredients || recipe.ingredients,
                        procedures: procedures || recipe.procedures,
                        recipeImage: recipeImage || recipe.recipeImage
                    }).then(function () {
                        return response.status(200).json({
                            status: 'Success',
                            message: 'Successfully updated recipe',
                            recipe: recipe
                        });
                    }).catch(function (error) {
                        return response.status(500).json({
                            status: 'Failed',
                            message: error.message
                        });
                    });
                }
                return response.status(401).json({
                    status: 'Failed',
                    message: 'Can not update a recipe not created by you'
                });
            }).catch(function () {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Recipe with id: ' + recipeId + ', not found'
                });
            });
        }

        /**
         * Deleting a recipe from the recipes catalog
         * @memberof RecipesApiController
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         *
         * @returns {object} delete error messages object or success messages object with new recipe data
         */

    }, {
        key: 'deleteRecipe',
        value: function deleteRecipe(request, response) {
            var userId = request.decoded.userId,
                recipeId = parseInt(request.params.recipeID.trim(), 10);

            if (Number.isNaN(recipeId)) {
                return response.status(406).json({
                    status: 'Failed',
                    message: 'Recipe ID must be a number'
                });
            }

            return Recipes.findById(recipeId).then(function (recipe) {
                if (recipe.userId === userId) {
                    return Recipes.destroy({
                        where: {
                            id: recipeId
                        }
                    }).then(function () {
                        return response.status(200).json({
                            status: 'Success',
                            message: 'Successfully delected recipe',
                            recipe: recipe
                        });
                    });
                }
                return response.status(401).json({
                    status: 'Failed',
                    message: 'You can not delete a recipe not created by you'
                });
            }).catch(function () {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'Recipe with id: ' + recipeId + ', not found'
                });
            });
        }

        /**
         * Retrieve all recipes from the catalog either in sorted or non sorted format
         * @memberof RecipesApiController
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         *
         * @returns {object} recipes retrival error messages object or success message object with recipe data
         */

    }, {
        key: 'getRecipes',
        value: function getRecipes(request, response) {
            if (!request.query.sort) {
                return Recipes.findAll({
                    limit: 6,
                    order: [['createdAt', 'DESC']]
                }).then(function (recipes) {
                    if (recipes.length !== 0) {
                        return response.status(200).json({
                            status: 'Success',
                            message: 'Successfully retrieved all recipes',
                            recipes: recipes
                        });
                    }
                    return response.status(404).json({
                        status: 'Failed',
                        message: 'There are no available recipes'
                    });
                }).catch(function (error) {
                    return response.status(404).json({
                        status: 'Failed',
                        message: error.message
                    });
                });
            }

            var order = request.query.order.toUpperCase();
            if (request.query.sort === 'upvotes') {
                return Recipes.findAll({
                    limit: 6,
                    order: [['upvotes', order]]
                }).then(function (recipes) {
                    if (recipes.length !== 0) {
                        return response.status(200).json({
                            status: 'Success',
                            message: 'Successfully retrieved all recipes by most upvotes in ' + order.toLowerCase() + 'ending order',
                            recipes: recipes
                        });
                    }
                    return response.status(404).json({
                        status: 'Failed',
                        message: 'There are no available recipes'
                    });
                }).catch(function (error) {
                    return response.status(404).json({
                        status: 'Failed',
                        message: error.message
                    });
                });
            }

            return Recipes.findAll({
                limit: 6,
                order: [['downvotes', order]]
            }).then(function (recipes) {
                if (recipes.length !== 0) {
                    response.status(200).json({
                        status: 'Success',
                        message: 'Successfully retrieved all recipes by most downvotes in ' + order.toLowerCase() + 'ending order',
                        recipes: recipes
                    });
                }
                return response.status(404).json({
                    status: 'Failed',
                    message: 'There are no available recipes'
                });
            }).catch(function (error) {
                return response.status(404).json({
                    status: 'Failed',
                    message: error.message
                });
            });
        }
    }]);

    return RecipesApiController;
}();

exports.default = RecipesApiController;