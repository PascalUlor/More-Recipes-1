'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipes = _models2.default.Recipes;

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
         * @static
         * @param {object} req
         * @param {object} res
         * @returns {object} insertion error messages or success message
         * @memberof RecipesApiController
         */
        value: function addRecipe(req, res) {
            var _req$body = req.body,
                title = _req$body.title,
                ingredients = _req$body.ingredients,
                procedures = _req$body.procedures,
                upvotes = _req$body.upvotes,
                downvotes = _req$body.downvotes,
                userId = req.decoded.userId;


            return Recipes.findOne({ where: { title: title } }).then(function (found) {
                if (found && found.title === title) {
                    res.status(400).json({
                        status: 'Failed',
                        message: 'Recipe with title:' + title + ', already exist in your catalog'
                    });
                }

                return Recipes.create({
                    title: title,
                    ingredients: ingredients,
                    procedures: procedures,
                    upvotes: upvotes,
                    downvotes: downvotes,
                    userId: userId
                }).then(function (recipe) {
                    return res.status(201).json({
                        status: 'Success',
                        message: 'Successfully added new recipe',
                        recipe: recipe
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
         * Modify a recipe in the recipes catalog
         * @static
         * @param {object} req
         * @param {object} res
         * @returns {object} insertion error messages or success messages
         * @memberof RecipesApiController
         */

    }, {
        key: 'updateRecipe',
        value: function updateRecipe(req, res) {
            var _req$body2 = req.body,
                title = _req$body2.title,
                ingredients = _req$body2.ingredients,
                procedures = _req$body2.procedures,
                userId = req.decoded.userId,
                recipeId = req.params.recipeID;


            return Recipes.findById(recipeId).then(function (recipe) {
                if (recipe.userId === userId) {
                    return Recipes.update({
                        title: title || recipe.title,
                        ingredients: ingredients || recipe.ingredients,
                        procedures: procedures || recipe.procedures
                    }, {
                        where: {
                            id: recipeId
                        }
                    }).then(function () {
                        return res.status(201).json({
                            status: 'Success',
                            message: 'Successfully updated recipe'
                        });
                    }).catch(function (error) {
                        return res.status(500).json({
                            status: 'Failed',
                            message: error.message
                        });
                    });
                }
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Can not update a recipe not created by you'
                });
            }).catch(function () {
                return res.status(404).json({
                    status: 'Failed',
                    message: 'Recipe with id: ' + recipeId + ', not found'
                });
            });
        }

        /**
         * Deleting a recipe from the recipes catalog
         * @static
         * @param {object} req
         * @param {object} res
         * @returns {object} delete error messages or success messages
         * @memberof RecipesApiController
         */

    }, {
        key: 'deleteRecipe',
        value: function deleteRecipe(req, res) {
            var userId = req.decoded.userId,
                recipeId = req.params.recipeID;

            return Recipes.findById(recipeId).then(function (recipe) {
                if (recipe.userId === userId) {
                    return Recipes.destroy({
                        where: {
                            id: recipeId
                        }
                    }).then(function () {
                        return res.status(200).json({
                            status: 'Success',
                            message: 'Successfully delected recipe'
                        });
                    });
                }
                return res.status(401).json({
                    status: 'Failed',
                    message: 'You can not delete a recipe not created by you'
                });
            }).catch(function () {
                return res.status(404).json({
                    status: 'Failed',
                    message: 'Recipe with id: ' + recipeId + ', not found'
                });
            });
        }

        /**
         * Retrieve all recipes from the catalog either in sorted or non sorted format
         * @static
         * @param {obj} req
         * @param {object} res
         * @returns {object} retrival error messages or success message
         * @memberof RecipesApiController
         */

    }, {
        key: 'getRecipes',
        value: function getRecipes(req, res) {
            if (!req.query.sort) {
                return Recipes.findAll({
                    limit: 6,
                    order: [['createdAt', 'DESC']]
                }).then(function (recipes) {
                    if (recipes && recipes.length !== 0) {
                        res.status(200).json({
                            status: 'Success',
                            message: 'Successfully retrieved all recipes',
                            recipes: recipes
                        });
                    }
                    return res.status(404).json({
                        status: 'Failed',
                        message: 'There are no available recipes'
                    });
                }).catch(function (error) {
                    return res.status(404).json({
                        status: 'Failed',
                        message: error.message
                    });
                });
            }

            var order = req.query.order.toUpperCase();
            if (req.query.sort === 'upvotes') {
                return Recipes.findAll({
                    limit: 6,
                    order: [['upvotes', order]]
                }).then(function (recipes) {
                    if (recipes && recipes.length !== 0) {
                        res.status(200).json({
                            status: 'Success',
                            message: 'Successfully retrieved all recipes by most upvotes in ' + order.toLowerCase() + 'ending order',
                            recipes: recipes
                        });
                    }
                    return res.status(404).json({
                        status: 'Failed',
                        message: 'There are no available recipes'
                    });
                }).catch(function (error) {
                    return res.status(404).json({
                        status: 'Failed',
                        message: error.message
                    });
                });
            }

            return Recipes.findAll({
                limit: 6,
                order: [['downvotes', order]]
            }).then(function (recipes) {
                if (recipes && recipes.length !== 0) {
                    res.status(200).json({
                        status: 'Success',
                        message: 'Successfully retrieved all recipes by most downvotes in ' + order.toLowerCase() + 'ending order',
                        recipes: recipes
                    });
                }
                return res.status(404).json({
                    status: 'Failed',
                    message: 'There are no available recipes'
                });
            }).catch(function (error) {
                return res.status(404).json({
                    status: 'Failed',
                    message: error.message
                });
            });
        }
    }]);

    return RecipesApiController;
}();

exports.default = RecipesApiController;