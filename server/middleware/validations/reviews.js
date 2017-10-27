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
     */
    static addReviewsValidation(req, res, next) {
        const { review } = req.body,
            errors = {};
        // check for undefined inputs
        if (review === undefined) {
            res.status(400);
            res.json({
                status: 'Failed',
                message: 'Review body field is not defined'
            });
        } else {
            // validation for review body
            if (!validator.isEmpty(review)) {
                if (!(validator.isLength(review, { min: 5, max: 1000 }))) {
                    errors.review = 'Review should be between 5 and 1000 characters';
                }
            } else { errors.review = 'Review body is required'; }

            const result = { isValid: isEmpty(errors) };

            if (!result.isValid) {
                res.status(400);
                res.json({ errors });
            } else {
                next();
            }
        }
    }
}