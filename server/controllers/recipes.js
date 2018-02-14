import models from '../models';
import checkId from '../utils/checkId';
import fetchRecipes from '../utils/recipes';
import requestFeedback from '../utils/requestFeedback';
import modifiedFavoriteNotifier from '../utils/modifiedFavoriteNotifier';

const {
  User,
  Recipe,
  Review,
  Favorite,
  Vote
} = models;


/**
 * Class implementation for /api/v1/recipes routes
 * @class RecipeApiController
 */
export default class RecipeApiController {
  /**
   * Add a recipe to recipes catalog
   * @memberof RecipeApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} insertion error messages object or
   * success message object
   */
  static addRecipe(request, response) {
    const {
        title,
        ingredients,
        procedures,
        recipeImage
      } = request.body, { userId } = request.decoded;
    Recipe.findOne({ where: { title, userId } }).then((found) => {
      if (found && found.title === title) {
        return requestFeedback.error(
          response, 409,
          `Recipe with title:${title}, already exist in your catalog`
        );
      }

      return Recipe.create({
        title,
        ingredients,
        procedures,
        recipeImage,
        userId
      }).then(recipe => requestFeedback.success(
        response, 201,
        'Successfully added new recipe', { recipe }
      ))
        .catch(error => requestFeedback.error(response, 500, error.message));
    }).catch(error => requestFeedback.error(response, 500, error.message));
  }

  /**
   * Modify a recipe in the recipes catalog
   * @memberof RecipeApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} insertion error messages object or
   * success messages object
   */
  static updateRecipe(request, response) {
    const {
        title,
        ingredients,
        procedures,
        recipeImage
      } = request.body, { userId } = request.decoded,
      recipeId = request.params.recipeID;

    return Recipe.findById(recipeId).then((recipe) => {
      if (recipe.userId === userId) {
        return recipe.updateAttributes({
          title: (title) || recipe.title,
          ingredients: (ingredients) || recipe.ingredients,
          procedures: (procedures) || recipe.procedures,
          recipeImage: (recipeImage) || recipe.recipeImage
        }).then(() => {
          Favorite.findAll({
            where: { recipeId: recipe.id },
            attributes: ['userId']
          }).then((favorites) => {
            if (favorites.length === 0) {
              return requestFeedback.success(
                response, 200,
                'Successfully updated recipe', { recipe }
              );
            }

            const allFoundUserIds = favorites.map(favorite => favorite.userId);

            return User.findAll({
              where: { id: allFoundUserIds },
              attributes: ['username', 'email']
            }).then((allFoundRecipeUsers) => {
              requestFeedback.success(
                response, 200,
                'Successfully updated recipe', { recipe }
              );
              modifiedFavoriteNotifier(
                User, userId,
                recipe, allFoundRecipeUsers, request
              );
            });
          });
        }).catch(error => (requestFeedback.error(
          response,
          500, error.message
        )));
      }
      return requestFeedback.error(
        response, 401,
        'Can not update a recipe not created by you'
      );
    }).catch(() => requestFeedback.error(
      response, 404,
      'Recipe not found or has been deleted'
    ));
  }

  /**
   * Deleting a recipe from the recipes catalog
   * @memberof RecipeApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} delete error messages object or
   * success messages object with new recipe data
   */
  static deleteRecipe(request, response) {
    const { userId } = request.decoded,
      recipeId = parseInt(request.params.recipeID.trim(), 10);

    if (checkId.recipeId(response, recipeId)) {
      return Recipe.findById(recipeId).then((recipe) => {
        if (recipe.userId === userId) {
          return Recipe.destroy({
            where: {
              id: recipeId
            },
          }).then(() => requestFeedback.success(
            response, 200,
            'Successfully delected recipe', { recipe }
          ));
        }
        return requestFeedback.error(
          response, 401,
          'You can not delete a recipe not created by you'
        );
      }).catch(() => requestFeedback.error(
        response, 404,
        'Recipe not found or has been deleted'
      ));
    }
  }

  /**
   * Retrieve all recipes from catalog either in sorted or non sorted format
   * @memberof RecipeApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} recipes retrival error messages object or
   * success message object with recipe data
   */
  static getRecipes(request, response) {
    let message1 = 'There are no available recipes';
    if (!request.query.sort) {
      if (request.query.search) {
        message1 = 'No Recipes Found';
      }
      const message2 = 'Successfully retrieved all recipes';
      return fetchRecipes(
        request, response, Recipe, User,
        null, 0, 'updatedAt', 'DESC', message1, message2
      );
    }
    const orderBy = request.query.sort.toUpperCase(),
      orderType = request.query.order.toUpperCase(),
      message2 = 'Successfully retrieved all recipes by upvote or downvote';
    return fetchRecipes(
      request, response, Recipe, User, null, 0,
      orderBy.toLowerCase(), orderType.toLowerCase(), message1, message2
    );
  }

  /**
   * @description Retrieves all user recipes from their recipes catalog
   * @memberof RecipeApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} recipes retrival error messages object or
   * success messages object with recipe data
   */
  static getUserRecipes(request, response) {
    const { userId } = request.decoded;

    const message1 = 'You have no available recipes',
      message2 = 'Successfully retrieved your recipe(s)';
    fetchRecipes(
      request, response, Recipe, User, null,
      userId, 'createdAt', 'DESC', message1, message2
    );
  }

  /**
   * @description Retrieves a particular recipe from the database
   * @memberof RecipeApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} recipe retrival error message object or
   * success message object with recipe data
   */
  static getSingleRecipe(request, response) {
    const recipeId = parseInt(request.params.recipeID.trim(), 10);
    let isFavorited = false,
      vote = '';

    if (checkId.recipeId(response, recipeId)) {
      Recipe.findById(recipeId, {
        include: [
          { model: User, attributes: ['fullName'] },
          {
            model: Review,
            attributes: [
              'id', 'reviewBody', 'username', 'profileImage', 'createdAt'
            ]
          }
        ]
      }).then((recipe) => {
        const updateRecipe = boolean => recipe.update({
          viewsCount: recipe.viewsCount + 1,
          hasOwnerViewed: boolean
        });
        if (recipe) {
          if (request.decoded) {
            const { userId } = request.decoded;
            if (userId === recipe.userId && !recipe.hasOwnerViewed) {
              updateRecipe(true);
            } else if (userId !== recipe.userId) {
              updateRecipe(recipe.hasOwnerViewed);
            }

            return Favorite.findOne({
              where: { userId, recipeId }
            }).then((foundFavorite) => {
              if (foundFavorite) {
                isFavorited = true;
              }
              Vote.findOne({
                where: { userId, recipeId }
              }).then((foundVote) => {
                if (foundVote) {
                  ({ vote } = foundVote);
                }
                return requestFeedback.success(
                  response, 200,
                  'Successfully retrieved recipe', { recipe, isFavorited, vote }
                );
              });
            });
          }
          updateRecipe(recipe.hasOwnerViewed);
          return requestFeedback.success(
            response, 200,
            'Successfully retrieved recipe', { recipe, isFavorited, vote }
          );
        }
        return requestFeedback.error(
          response, 404,
          'Recipe not found or has been deleted'
        );
      });
    }
  }
}
