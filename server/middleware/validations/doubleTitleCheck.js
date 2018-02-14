import { Recipe } from '../../models';
import requestFeedback from '../../utils/requestFeedback';

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
   * @returns {object} validation error message or passes control
   * the next middleware
   */
  static checkForDoubleRecipeTitle(request, response) {
    const { title } = request.body, { userId } = request.decoded;
    return Recipe.findOne({ where: { title, userId } }).then((found) => {
      if (found && found.title === title) {
        return requestFeedback
          .error(response, 409, `Recipe with title: ${title},\
 already exist in your catalog`);
      }
      return requestFeedback
        .success(response, 200, 'This title does not exit in your catalog');
    });
  }
}
