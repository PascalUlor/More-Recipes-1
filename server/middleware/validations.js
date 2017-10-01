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
        const { title, ingredients, procedures } = req.body,
            errors = {};
        // check for undefined inputs
        if (title === undefined || ingredients === undefined || procedures === undefined) {
            res.status(400);
            res.json({
                status: 'Failed',
                message: 'All or some fields are not defined'
            });
        } else {
            // validation for recipe title
            if (!(validator.isEmpty(title))) {
                if (validator.toInt(title)) {
                    errors.title = 'Title should not start with number(s)';
                }
            } else { errors.title = 'Title of recipe is required'; }

            // validation for recipe ingredients
            if (!(ingredients.length === 0)) {
                if (ingredients.length < 15) {
                    errors.ingredients = 'Ingredients provided must be more than 15 characters';
                }
            } else { errors.ingredients = 'Recipe ingredients are required'; }

            // validation for recipe directions
            if (!(validator.isEmpty(procedures))) {
                if (!(validator.isLength(procedures, { min: 20, max: 1000 }))) {
                    errors.procedures = 'Procedures provided must be more than 20 characters';
                }
            } else { errors.procedures = 'Procedures for your recipe are required'; }

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
                res.status(400);
                res.json({
                    status: 'Failed',
                    message: 'Sort or(and) order query parameter(s) is(are) not defined'
                });
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
                res.json(400);
                res.json({ errors });
            } else {
                next();
            }
        }
    }
}