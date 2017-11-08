import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validates POST and GET requests for recipes route
 * @class RecipesValidation
 */
export default class RecipesValidation {
    /**
     * Validates all recipe details before allowing access to controller class
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.body
     * @memberof RecipesValidation
     */
    static addRecipeValidations(req, res, next) {
        const { title, ingredients, procedures } = req.body,
            errors = {};
        if (title === undefined || ingredients === undefined || procedures === undefined) {
            return res.status(400).json({
                status: 'Failed',
                message: 'All or some fields are not defined'
            });
        }

        if (!validator.isEmpty(title)) {
            for (let character = 0; character < title.length; character += 1) {
                if (validator.toInt(title[character])) {
                    errors.title = 'Recipe title must not contain numbers';
                    break;
                }
            }
        } else { errors.title = 'Recipe title is required'; }

        if (!validator.isEmpty(ingredients)) {
            if (!validator.isLength(ingredients, { min: 20, max: 1000 })) {
                errors.ingredients = 'Recipe ingredients provided must be more than 20 characters';
            }
        } else { errors.ingredients = 'Recipe ingredients are required'; }

        if (!validator.isEmpty(procedures)) {
            if (!validator.isLength(procedures, { min: 30, max: 1000 })) {
                errors.procedures = 'Recipe procedures provided must be more than 30 characters';
            }
        } else { errors.procedures = 'Recipe procedures are required'; }

        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            return res.status(400).json({ errors });
        }
        next();
    }

    /**
     * Validates updated recipe detail(s) before allowing access to controller class
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or content(s) of req.body
     * @memberof RecipesValidation
     */
    static updateRecipeValidations(req, res, next) {
        const { title, ingredients, procedures } = req.body,
            errors = {};
        if (!(title || ingredients || procedures)) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Provide a field to update'
            });
        }

        if (title) {
            for (let character = 0; character < title.length; character += 1) {
                if (validator.toInt(title[character])) {
                    errors.title = 'Recipe title must not contain numbers';
                    break;
                }
            }
        }

        if (ingredients) {
            if (!validator.isLength(ingredients, { min: 20, max: 1000 })) {
                errors.ingredients = 'Recipe ingredients provided must be more than 20 characters';
            }
        }

        if (procedures) {
            if (!validator.isLength(procedures, { min: 30, max: 1000 })) {
                errors.procedures = 'Recipe procedures provided must be more than 30 characters';
            }
        }

        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            return res.status(400).json({ errors });
        }
        next();
    }

    /**
     * Validates query and non query routes before allowing access to controller class
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.query(or nothing)
     * @memberof RecipesValidation
     */
    static getSortdedRecipesValidation(req, res, next) {
        const { sort, order } = req.query,
            errors = {};
        if (!req.originalUrl.includes('?')) {
            return next();
        }

        if (sort === undefined || order === undefined) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Sort or(and) order query parameter(s) is(are) not defined'
            });
        }

        if (!validator.isEmpty(sort)) {
            if (!(sort.toLowerCase() === 'upvotes' || sort.toLowerCase() === 'downvotes')) {
                errors.sortType = 'Sort query must be either upvotes or downvotes';
            }
        } else { errors.sortType = 'Sort query is required'; }

        if (!validator.isEmpty(order)) {
            if (!(order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc')) {
                errors.order = 'Order query must be either asc or desc';
            }
        } else { errors.order = 'Order query is required'; }


        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            return res.status(400).json({ errors });
        }
        next();
    }
}