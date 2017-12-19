import models from '../models';

const { Users, Recipes } = models;


/**
 * Class implementation for /api/v1/recipes routes
 * @class RecipesApiController
 */
export default class RecipesApiController {
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
  static addRecipe(request, response) {
    const {
      title,
      ingredients,
      procedures,
      recipeImage
    } = request.body, { userId } = request.decoded;
    return Users.findById(userId).then((foundUser) => {
      if (!foundUser) {
        return response.status(404).json({
          status: 'Failed',
          message: 'User not found or may have been deleted'
        });
      }
      return Recipes.findOne({ where: { title, userId } }).then((found) => {
        if (found && found.title === title) {
          return response.status(409).json({
            status: 'Failed',
            message: `Recipe with title:${title}, already exist in your catalog`
          });
        }

        return Recipes.create({
          title,
          ingredients,
          procedures,
          recipeImage,
          userId
        }).then(recipe => response.status(201).json({
          status: 'Success',
          message: 'Successfully added new recipe',
          recipe
        })).catch(error => response.status(500).json({
          status: 'Failed',
          message: error.message
        }));
      }).catch(error => response.status(500).json({
        status: 'Failed',
        message: error.message
      }));
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
  static updateRecipe(request, response) {
    const {
      title,
      ingredients,
      procedures,
      recipeImage
    } = request.body, { userId } = request.decoded,
      recipeId = parseInt(request.params.recipeID.trim(), 10);

    return Recipes.findById(recipeId).then((recipe) => {
      if (recipe.userId === userId) {
        return recipe.updateAttributes({
          title: (title) || recipe.title,
          ingredients: (ingredients) || recipe.ingredients,
          procedures: (procedures) || recipe.procedures,
          recipeImage: (recipeImage) || recipe.recipeImage
        }).then(() => response.status(200).json({
          status: 'Success',
          message: 'Successfully updated recipe',
          recipe
        })).catch(error => response.status(500).json({
          status: 'Failed',
          message: error.message
        }));
      }
      return response.status(401).json({
        status: 'Failed',
        message: 'Can not update a recipe not created by you'
      });
    }).catch(() => response.status(404).json({
      status: 'Failed',
      message: `Recipe with id: ${recipeId}, not found`
    }));
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
  static deleteRecipe(request, response) {
    const { userId } = request.decoded, recipeId = parseInt(request.params.recipeID.trim(), 10);

    if (Number.isNaN(recipeId)) {
      return response.status(406).json({
        status: 'Failed',
        message: 'Recipe ID must be a number'
      });
    }

    return Recipes.findById(recipeId).then((recipe) => {
      if (recipe.userId === userId) {
        return Recipes.destroy({
          where: {
            id: recipeId
          },
        }).then(() => response.status(200).json({
          status: 'Success',
          message: 'Successfully delected recipe',
          recipe
        }));
      }
      return response.status(401).json({
        status: 'Failed',
        message: 'You can not delete a recipe not created by you'
      });
    }).catch(() => response.status(404).json({
      status: 'Failed',
      message: `Recipe with id: ${recipeId}, not found`
    }));
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
  static getRecipes(request, response) {
    if (!request.query.sort) {
      return Recipes.findAll({
        limit: 6,
        order: [
          ['createdAt', 'DESC']
        ],
        include: [{ model: Users, attributes: ['fullName'] }]
      }).then((recipes) => {
        if (recipes.length !== 0) {
          return response.status(200).json({
            status: 'Success',
            message: 'Successfully retrieved all recipes',
            recipes
          });
        }
        return response.status(404).json({
          status: 'Failed',
          message: 'There are no available recipes',
        });
      }).catch(error => response.status(404).json({
        status: 'Failed',
        message: error.message
      }));
    }

    const order = request.query.order.toUpperCase();
    if (request.query.sort === 'upvotes') {
      return Recipes.findAll({
        limit: 6,
        order: [
          ['upvotes', order]
        ],
        include: [{ model: Users, attributes: ['fullName'] }]
      }).then((recipes) => {
        if (recipes.length !== 0) {
          return response.status(200).json({
            status: 'Success',
            message: `Successfully retrieved all recipes by most upvotes in ${order.toLowerCase()}ending order`,
            recipes
          });
        }
        return response.status(404).json({
          status: 'Failed',
          message: 'There are no available recipes',
        });
      }).catch(error => response.status(404).json({
        status: 'Failed',
        message: error.message
      }));
    }

    return Recipes.findAll({
      limit: 6,
      order: [
        ['downvotes', order]
      ],
      include: [{ model: Users, attributes: ['fullName'] }]
    }).then((recipes) => {
      if (recipes.length !== 0) {
        response.status(200).json({
          status: 'Success',
          message: `Successfully retrieved all recipes by most downvotes in ${order.toLowerCase()}ending order`,
          recipes
        });
      }
      return response.status(404).json({
        status: 'Failed',
        message: 'There are no available recipes',
      });
    }).catch(error => response.status(404).json({
      status: 'Failed',
      message: error.message
    }));
  }
}
