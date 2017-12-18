import models from '../../models';

const { Recipes } = models;

/**
 * Class implementation for /api/v1/recipes routes
 * @class ValidateDoubleRecipeTitle
 */
export default class ValidateDoubleRecipeTitle {
  /**
   * Checks for double recipe title
   * @memberof ValidateDoubleRecipeTitle
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   * @param   {object} next      the node/express middleware next object
   *
   * @returns {object} validation error message or passes control the next middleware
   */
  static checkForDoubleRecipeTitle(request, response) {
    const { title } = request.body, { userId } = request.decoded;
    return Recipes.findOne({ where: { title, userId } }).then((found) => {
      if (found && found.title === title) {
        return response.json({
          status: 'Failed',
          message: `Recipe with title: ${title}, already exist in your catalog`
        });
      }
      return response.json({
        status: 'Success'
      });
    });
  }
}
