import models from '../models';

const { Recipes } = models;


/**
 * Class implementation for /api/v1/recipes routes
 * @class RecipesApiController
 */
export default class RecipesApiController {
    /**
     * Add a recipe to recipes table
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} insertion error messages or success messages
     */
    static addRecipe(req, res) {
        const {
            title,
            ingredients,
            procedures,
            upvotes,
            downvotes,
        } = req.body, { userId } = req.decoded;

        Recipes.create({
                title,
                ingredients,
                procedures,
                upvotes,
                downvotes,
                userId
            })
            .then((recipe) => {
                res.status(201)
                    .json({
                        status: 'Success',
                        message: 'Successfully added new recipe',
                        recipe
                    });
            }).catch((err) => {
                if (err) {
                    res.status(500)
                        .json({
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
    static updateRecipe(req, res) {
        const { userId } = req.decoded, {
                title,
                ingredients,
                procedures
            } = req.body,
            recipeId = req.params.recipeID;

        if (title || ingredients || procedures) {
            Recipes.findById(recipeId)
                .then((recipe) => {
                    if (recipe) {
                        if (recipe.userId === userId) {
                            Recipes.update({
                                title: (title) || recipe.title,
                                ingredients: (ingredients) || recipe.ingredients,
                                procedures: (procedures) || recipe.procedures
                            }, {
                                where: {
                                    id: recipeId
                                }
                            }).then(() =>
                                res.status(200)
                                .json({
                                    status: 'Success',
                                    message: 'Successfully updated recipe'
                                }));
                        } else {
                            res.status(400)
                                .json({
                                    status: 'Failed',
                                    message: 'You can not perform an update on a recipe not created by you'
                                });
                        }
                    } else {
                        res.status(404)
                            .json({
                                status: 'Failed',
                                message: `Recipe with id: ${recipeId}, is not available`
                            });
                    }
                }).catch((err) => {
                    if (err) {
                        res.status(500)
                            .json({
                                status: 'Failed',
                                message: 'Error updating recipe'
                            });
                    }
                });
        } else {
            res.status(400)
                .json({
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
    static deleteRecipe(req, res) {
        const { userId } = req.decoded,
            recipeId = req.params.recipeID;

        Recipes.findById(recipeId)
            .then((recipe) => {
                if (recipe) {
                    if (recipe.userId === userId) {
                        Recipes.destroy({
                                where: {
                                    id: recipeId
                                },
                            })
                            .then(() => res.status(200).json({
                                status: 'Success',
                                message: 'Successfully delected recipe'
                            }));
                    } else {
                        res.status(401)
                            .json({
                                status: 'Failed',
                                message: 'You can not delete a recipe not created by you'
                            });
                    }
                } else {
                    res.status(404)
                        .json({
                            status: 'Failed',
                            message: `Recipe with id: ${recipeId}, is not available`
                        });
                }
            }).catch((err) => {
                if (err) {
                    res.status(500)
                        .json({
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
    static getRecipes(req, res) {
        if (!req.query.sort) {
            Recipes.findAll()
                .then((recipes) => {
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
                })
                .catch((err) => {
                    if (err) {
                        res.status(500)
                            .json({ message: 'Server error' });
                    }
                });
        }

        let order;
        if (req.query.sort === 'upvotes') {
            if (req.query.order === 'desc') {
                order = 'DESC';
            } else { order = 'ASC'; }
            Recipes.findAll({
                    limit: 10,
                    order: [
                        ['upvotes', order]
                    ]
                })
                .then((recipes) => {
                    if (!recipes) {
                        res.status(404).json({
                            status: 'Failed',
                            message: 'There are no available recipes'
                        });
                    } else {
                        res.status(200).json({
                            status: 'Success',
                            message: 'Recipes found',
                            data: recipes
                        });
                    }
                })
                .catch((err) => {
                    if (err) {
                        res.status(500).json({ message: 'Server error' });
                    }
                });
        } else {
            // Get least voted recipes
            if (req.query.order === 'desc') {
                order = 'DESC';
            } else { order = 'ASC'; }

            Recipes.findAll({
                    limit: 10,
                    order: [
                        ['downvotes', order]
                    ]
                }).then((recipes) => {
                    if (!recipes) {
                        res.status(404).json({
                            status: 'Failed',
                            message: 'There are no available recipes'
                        });
                    } else {
                        res.status(200).json({
                            status: 'Success',
                            message: 'Recipes found',
                            data: recipes
                        });
                    }
                })
                .catch((err) => {
                    if (err) {
                        res.status(500).json({ message: 'Server error' });
                    }
                });
        }
    }
}