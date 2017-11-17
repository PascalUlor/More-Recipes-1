import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validates all requestuests for reviews route
 * @class ReviewsValidation
 */
export default class ReviewsValidation {
    /**
     * Validates all reviews details before allowing access to controller class
     * @memberof ReviewsValidation
     * @static
     *
     * @param   {object} request   the server/http(s) request object
     * @param   {object} response  the server/http(s) response object
     * @param   {object} next      the node/express middleware next object
     *
     * @returns {object} validation error messages object or content of request.body object passed to controller
     */
    static postReviewValidations(request, response, next) {
        if (request.body.reviewBody === undefined) {
            return response.status(400).json({
                status: 'Failed',
                message: 'Review for recipe is not defined or is missing'
            });
        }

        const reviewBody = request.body.reviewBody.trim(),
            errors = {};

        if (!validator.isEmpty(reviewBody)) {
            if (!validator.isLength(reviewBody, { min: 4, max: undefined })) {
                errors.reviewBody = 'Review provided must be more than 4 characters';
            }
        } else { errors.reviewBody = 'Review for recipe is required'; }

        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            return response.status(400).json({ errors });
        }
        next();
    }
}