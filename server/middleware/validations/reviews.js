import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validates all requests for reviews route
 * @class ReviewsValidation
 */
export default class ReviewsValidation {
    /**
     * Validates all reviews details before allowing access to controller class
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or content of req.body passed to controller
     * @memberof ReviewsValidation
     */
    static postReviewValidations(req, res, next) {
        const { reviewBody } = req.body,
            errors = {};
        if (reviewBody === undefined) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Review for recipe is not defined'
            });
        }
        if (!validator.isEmpty(reviewBody)) {
            if (!validator.isLength(reviewBody, { min: 4, max: undefined })) {
                errors.reviewBody = 'Review provided must be more than 4 characters';
            }
        } else { errors.reviewBody = 'Review for recipe is required'; }

        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            return res.status(400).json({ errors });
        }
        next();
    }
}