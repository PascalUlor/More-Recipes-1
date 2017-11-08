import models from '../models';

const { Recipes } = models;


/**
 * Class implementation for /api/v1/recipes routes
 * @class RecipesApiController
 */
export default class RecipesApiController {
    /**
     * Add a recipe to recipes catalog
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} insertion error messages or success message
     * @memberof RecipesApiController
     */
    static addRecipe(req, res) {
        const {
            title,
            ingredients,
            procedures,
            upvotes,
            downvotes,
        } = req.body, { userId } = req.decoded;

        return Recipes.findOne({ where: { title } }).then((found) => {
            if (found && found.title === title) {
                res.status(400).json({
                    status: 'Failed',
                    message: `Recipe with title:${title}, already exist in your catalog`
                });
            }

            return Recipes.create({
                title,
                ingredients,
                procedures,
                upvotes,
                downvotes,
                userId
            }).then(recipe => res.status(201).json({
                status: 'Success',
                message: 'Successfully added new recipe',
                recipe
            })).catch(error => res.status(500).json({
                status: 'Failed',
                message: error.message
            }));
        }).catch(error => res.status(500).json({
            status: 'Failed',
            message: error.message
        }));
    }

    /**
     * Modify a recipe in the recipes catalog
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} insertion error messages or success messages
     * @memberof RecipesApiController
     */
    static updateRecipe(req, res) {
        const { title, ingredients, procedures } = req.body, { userId } = req.decoded,
            recipeId = req.params.recipeID;

        return Recipes.findById(recipeId).then((recipe) => {
            if (recipe.userId === userId) {
                return Recipes.update({
                    title: (title) || recipe.title,
                    ingredients: (ingredients) || recipe.ingredients,
                    procedures: (procedures) || recipe.procedures
                }, {
                    where: {
                        id: recipeId
                    }
                }).then(() => res.status(201).json({
                    status: 'Success',
                    message: 'Successfully updated recipe'
                })).catch(error => res.status(500).json({
                    status: 'Failed',
                    message: error.message
                }));
            }
            return res.status(400).json({
                status: 'Failed',
                message: 'Can not update a recipe not created by you'
            });
        }).catch(() => res.status(404).json({
            status: 'Failed',
            message: `Recipe with id: ${recipeId}, not found`
        }));
    }

    /**
     * Deleting a recipe from the recipes catalog
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} delete error messages or success messages
     * @memberof RecipesApiController
     */
    static deleteRecipe(req, res) {
        const { userId } = req.decoded, recipeId = req.params.recipeID;

        return Recipes.findById(recipeId).then((recipe) => {
            if (recipe.userId === userId) {
                return Recipes.destroy({
                    where: {
                        id: recipeId
                    },
                }).then(() => res.status(200).json({
                    status: 'Success',
                    message: 'Successfully delected recipe'
                }));
            }
            return res.status(401).json({
                status: 'Failed',
                message: 'You can not delete a recipe not created by you'
            });
        }).catch(() => res.status(404).json({
            status: 'Failed',
            message: `Recipe with id: ${recipeId}, not found`
        }));
    }

    /**
     * Retrieve all recipes from the catalog either in sorted or non sorted format
     * @static
     * @param {obj} req
     * @param {object} res
     * @returns {object} retrival error messages or success message
     * @memberof RecipesApiController
     */
    static getRecipes(req, res) {
        if (!req.query.sort) {
            return Recipes.findAll({
                limit: 6,
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then((recipes) => {
                if (recipes && recipes.length !== 0) {
                    res.status(200).json({
                        status: 'Success',
                        message: 'Successfully retrieved all recipes',
                        recipes
                    });
                }
                return res.status(404).json({
                    status: 'Failed',
                    message: 'There are no available recipes',
                });
            }).catch(error => res.status(404).json({
                status: 'Failed',
                message: error.message
            }));
        }

        const order = req.query.order.toUpperCase();
        if (req.query.sort === 'upvotes') {
            return Recipes.findAll({
                limit: 6,
                order: [
                    ['upvotes', order]
                ]
            }).then((recipes) => {
                if (recipes && recipes.length !== 0) {
                    res.status(200).json({
                        status: 'Success',
                        message: `Successfully retrieved all recipes by most upvotes in ${order.toLowerCase()}ending order`,
                        recipes
                    });
                }
                return res.status(404).json({
                    status: 'Failed',
                    message: 'There are no available recipes',
                });
            }).catch(error => res.status(404).json({
                status: 'Failed',
                message: error.message
            }));
        }

        return Recipes.findAll({
            limit: 6,
            order: [
                ['downvotes', order]
            ]
        }).then((recipes) => {
            if (recipes && recipes.length !== 0) {
                res.status(200).json({
                    status: 'Success',
                    message: `Successfully retrieved all recipes by most downvotes in ${order.toLowerCase()}ending order`,
                    recipes
                });
            }
            return res.status(404).json({
                status: 'Failed',
                message: 'There are no available recipes',
            });
        }).catch(error => res.status(404).json({
            status: 'Failed',
            message: error.message
        }));
    }
}