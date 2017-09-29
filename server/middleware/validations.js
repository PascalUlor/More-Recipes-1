import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validates all routes
 * @class Validator
 */
export default class Validation {
    /**
     * Validates all recipe details before allowing access to database
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} Validation error messages or contents of req.body
     */
    static addRecipe(req, res, next) {
        const { title, ingredients, directions } = req.body,
            errors = {};
        // check for undefined inputs
        if (title === undefined || ingredients === undefined || directions === undefined) {
            res.json({ message: 'All or some fields are not defined' });
        } else {
            // validation for recipe title
            if (!(validator.isEmpty(title))) {
                if (validator.toInt(title)) {
                    errors.title = 'title should not start with number(s)';
                }
            } else { errors.username = 'title of recipe is required'; }

            // validation for recipe ingredients
            if (!(validator.isEmpty(ingredients))) {
                if (!(validator.isLength(ingredients, { min: 4, max: 30 }))) {
                    errors.ingredients = 'Please make sure recipe ingredients is adequate';
                }
            } else { errors.ingredients = 'Recipe ingredients are required'; }

            // validation for recipe directions
            if (!(validator.isEmpty(directions))) {
                if (!(validator.isLength(directions, { min: 20, max: 1000 }))) {
                    errors.directions = 'Please provide more directions for your recipe';
                }
            } else { errors.directions = 'Directions for your recipe is required'; }

            const result = { errors, isValid: isEmpty(errors) };

            if (!result.isValid) {
                res.json({ errors });
            } else {
                next();
            }
        }
    }
}