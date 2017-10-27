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
        const {
            reviewBody
        } = req.body,
            errors = {};
        // check for undefined inputs
        if (reviewBody === undefined) {
            res.status(400)
                .json({
                    status: 'Failed',
                    message: 'Review body field is not defined'
                });
        } else {
            // validation for review body
            if (validator.isEmpty(reviewBody)) {
                errors.reviewBody = 'Review body is required';
            }

            const result = { isValid: isEmpty(errors) };

            if (!result.isValid) {
                res.status(400)
                    .json({ errors });
            } else {
                next();
            }
        }
    }
}