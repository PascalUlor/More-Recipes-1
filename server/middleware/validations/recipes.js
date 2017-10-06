import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validates POST and GET requests for recipes route
 * @class RecipeValidation
 */
export default class RecipeValidation {
    /**
     * Validates all recipe details before allowing access to controller class
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.body
     */
    static addRecipeValidation(req, res, next) {
        const { title, ingredients, procedures } = req.body,
            errors = {};
        // check for undefined inputs
        if (title === undefined || ingredients === undefined || procedures === undefined) {
            return res.status(400)
                .json({
                    status: 'Failed',
                    message: 'All or some fields are not defined'
                });
        }
        // validation for recipe title
        if (!(validator.isEmpty(title))) {
            if (validator.toInt(title)) {
                errors.title = 'Title should not start with number(s)';
            }
        } else { errors.title = 'Title of recipe is required'; }

        // validation for recipe ingredients
        if (!(validator.isEmpty(ingredients))) {
            if (!(validator.isLength(ingredients, { min: 20, max: 1000 }))) {
                errors.ingredients = 'Recipe ingredients provided must be more than 20 characters';
            }
        } else { errors.ingredients = 'Recipe ingredients are required'; }

        // validation for recipe procedures
        if (!(validator.isEmpty(procedures))) {
            if (!(validator.isLength(procedures, { min: 30, max: 1000 }))) {
                errors.procedures = 'Procedures provided must be more than 20 characters';
            }
        } else { errors.procedures = 'Procedures for your recipe are required'; }

        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            res.status(400)
                .json({ errors });
        } else {
            next();
        }
    }

    /**
     * Validates query and non query routes before allowing access to controller class
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.query(or nothing)
     */
    static getSortdedRecipesValidation(req, res, next) {
        const { sort, order } = req.query,
            errors = {};
        if (!(req.originalUrl.includes('?'))) {
            return next();
        }
        if (sort === undefined || order === undefined) {
            return res.status(400)
                .json({
                    status: 'Failed',
                    message: 'Sort or(and) order query parameter(s) is(are) not defined'
                });
        }
        if (!(validator.isEmpty(sort))) {
            if (!(sort.toLowerCase() === 'upvotes' || sort.toLowerCase() === 'downvotes')) {
                errors.sortType = 'Sort query must be either upvotes or downvotes';
            }
        } else { errors.sortType = 'Sort query is required'; }

        if (!(validator.isEmpty(order))) {
            if (!(order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc')) {
                errors.order = 'Order query must be either asc or desc';
            }
        } else { errors.order = 'Order query is required'; }


        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            res.status(400)
                .json({ errors });
        } else {
            next();
        }
    }
}