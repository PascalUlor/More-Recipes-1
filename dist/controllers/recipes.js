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
         * Add a recipe to recipes table
         * @static
         * @param {object} req
         * @param {object} res
         * @returns {object} insertion error messages or success messages
         */
        value: function addRecipe(req, res) {
            var _req$body = req.body,
                title = _req$body.title,
                ingredients = _req$body.ingredients,
                procedures = _req$body.procedures,
                upvotes = _req$body.upvotes,
                downvotes = _req$body.downvotes,
                userId = req.decoded.userId;

            _models2.default.Recipes.create({
                title: title,
                ingredients: ingredients,
                procedures: procedures,
                upvotes: upvotes,
                downvotes: downvotes,
                userId: userId
            }).then(function (recipe) {
                res.status(201).json({
                    status: 'Success',
                    message: 'Successfully added new recipe',
                    recipe: recipe
                });
            }).catch(function (err) {
                if (err) {
                    res.status(500).json({
                        status: 'Failed',
                        message: 'Error adding new recipe'
                    });
                }
            });
        }

        /**
         * Modify a recipe in the recipes table
         * @static
         * @param {obj} req
         * @param {obj} res
         * @returns {obj} insertion error messages or success messages
         */

    }, {
        key: 'UpdateRecipe',
        value: function UpdateRecipe(req, res) {
            var userId = req.decoded.userId,
                _req$body2 = req.body,
                title = _req$body2.title,
                ingredients = _req$body2.ingredients,
                procedures = _req$body2.procedures,
                recipeId = req.params.recipeID;

            if (title || ingredients || procedures) {
                _models2.default.Recipes.findById(recipeId).then(function (recipe) {
                    if (recipe) {
                        if (recipe.userId === userId) {
                            _models2.default.Recipes.update({
                                title: title || recipe.title,
                                ingredients: ingredients || recipe.ingredients,
                                procedures: procedures || recipe.procedures
                            }, {
                                where: {
                                    id: recipeId
                                }
                            }).then(function () {
                                return res.status(202).json({
                                    status: 'Success',
                                    message: 'Successfully updated recipe'
                                });
                            });
                        } else {
                            res.status(400).json({
                                status: 'Failed',
                                message: 'You can not perform an update on a recipe not created by you'
                            });
                        }
                    } else {
                        res.status(404).json({
                            status: 'Failed',
                            message: 'Recipe with id: ' + recipeId + ', is not available'
                        });
                    }
                }).catch(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 'Failed',
                            message: 'Error updating recipe'
                        });
                    }
                });
            } else {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Provide a field to update'
                });
            }
        }

        /**
         * Deleting a recipe from the recipes catalog
         * @param {obj} req
         * @param {object} res
         * @returns {object} insertion error messages or success messages
         */

    }, {
        key: 'deleteRecipe',
        value: function deleteRecipe(req, res) {
            var userId = req.decoded.userId,
                recipeId = req.params.recipeID;

            _models2.default.Recipes.findById(recipeId).then(function (recipe) {
                if (recipe) {
                    if (recipe.userId === userId) {
                        _models2.default.Recipes.destroy({
                            where: {
                                id: recipeId
                            }
                        }).then(function () {
                            return res.status(200).json({
                                status: 'Success',
                                message: 'Successfully delected recipe'
                            });
                        });
                    } else {
                        res.status(401).json({
                            status: 'Failed',
                            message: 'You can not delete a recipe not created by you'
                        });
                    }
                } else {
                    res.status(404).json({
                        status: 'Failed',
                        message: 'Recipe with id: ' + recipeId + ', is not available'
                    });
                }
            }).catch(function (err) {
                if (err) {
                    res.status(500).json({
                        status: 'Failed',
                        message: 'Error deleting recipe'
                    });
                }
            });
        }

        /**
         * Deleting a recipe from the catalog
         * @param {obj} req
         * @param {object} res
         * @returns {object} insertion error messages or success messages
         */

    }, {
        key: 'getRecipes',
        value: function getRecipes(req, res) {
            if (!req.query.sort) {
                _models2.default.Recipes.findAll().then(function (recipes) {
                    if (!recipes) {
                        return res.status(404).json({
                            status: 'Failed',
                            message: 'There are no available recipes'
                        });
                    }
                    return res.status(200).json({
                        status: 'Success',
                        message: 'Recipes found',
                        data: recipes
                    });
                }).catch(function (err) {
                    if (err) {
                        res.status(500).json({ message: 'Server error' });
                    }
                });
            }

            var order = void 0;
            if (req.query.sort === 'upvotes') {
                if (req.query.order === 'desc') {
                    order = 'DESC';
                } else {
                    order = 'ASC';
                }
                _models2.default.Recipes.findAll({
                    limit: 10,
                    order: [['upvotes', order]]
                }).then(function (recipes) {
                    if (!recipes) {
                        return res.status(404).json({
                            status: 'Failed',
                            message: 'There are no available recipes'
                        });
                    }
                    return res.status(200).json({
                        status: 'Success',
                        message: 'Recipes found',
                        data: recipes
                    });
                }).catch(function (err) {
                    if (err) {
                        res.status(500).json({ message: 'Server error' });
                    }
                });
            } else {
                // Get least voted recipes
                if (req.query.order === 'desc') {
                    order = 'DESC';
                } else {
                    order = 'ASC';
                }

                _models2.default.Recipes.findAll({
                    limit: 10,
                    order: [['downvotes', order]]
                }).then(function (recipes) {
                    if (!recipes) {
                        return res.status(404).json({
                            status: 'Failed',
                            message: 'There are no available recipes'
                        });
                    }
                    return res.status(200).json({
                        status: 'Success',
                        message: 'Recipes found',
                        data: recipes
                    });
                }).catch(function (err) {
                    if (err) {
                        res.status(500).json({ message: 'Server error' });
                    }
                });
            }
        }
    }]);

    return RecipesApiController;
}();

exports.default = RecipesApiController;