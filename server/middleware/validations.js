import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validates all routes
 * @class Validation
 */
export default class Validation {
    /**
     * Validates all recipe details before allowing access to controller class
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} Validation error messages or contents of req.body
     */
    static addRecipeValidation(req, res, next) {
        const { title, ingredients, directions } = req.body,
            errors = {};
        // check for undefined inputs
        if (title === undefined || ingredients === undefined || directions === undefined) {
            res.status(400);
            res.json({
                status: 'Failed',
                message: 'All or some fields are not defined'
            });
        } else {
            // validation for recipe title
            if (!(validator.isEmpty(title))) {
                if (validator.toInt(title)) {
                    errors.title = 'title should not start with number(s)';
                }
            } else { errors.title = 'title of recipe is required'; }

            // validation for recipe ingredients
            if (!(ingredients.length === 0)) {
                if (ingredients.length < 4) {
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
                res.status(400);
                res.json({ errors });
            } else {
                next();
            }
        }
    }

    /**
     * Validates query and non query routes before allowing access to controller class
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} Validation error messages or contents of req.query(or nothing)
     */
    static getSortdedRecipesValidation(req, res, next) {
        const { sort, order } = req.query,
            errors = {};
        if (!(req.originalUrl.includes('?'))) {
            next();
        } else {
            if (sort === undefined || order === undefined) {
                res.status(409);
                res.json({ message: 'Sort or/and order query parameter is/are missing' });
            } else {
                if (!(validator.isEmpty(sort))) {
                    if (!(sort.toLowerCase() === 'upvotes' || sort.toLowerCase() === 'downvotes')) {
                        errors.sort = 'Sort query must be either upvotes or downvotes';
                    }
                } else { errors.sort = 'Sort query is required'; }

                if (!(validator.isEmpty(order))) {
                    if (!(order.toLowerCase() === 'asc' || order.toLowerCase() === 'des')) {
                        errors.order = 'Order query must be either asc or des';
                    }
                } else { errors.order = 'Order query is required'; }
            }

            const result = { errors, isValid: isEmpty(errors) };

            if (!result.isValid) {
                res.json({ errors });
            } else {
                next();
            }
        }
    }
}