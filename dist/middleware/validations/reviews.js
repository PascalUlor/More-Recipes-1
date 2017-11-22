'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Validates all requests for reviews route
 * @class ReviewsValidation
 */
var ReviewsValidation = function () {
    function ReviewsValidation() {
        _classCallCheck(this, ReviewsValidation);
    }

    _createClass(ReviewsValidation, null, [{
        key: 'postReviewValidations',

        /**
         * Validates all reviews details before allowing access to controller class
         * @param {object} req
         * @param {object} res
         * @param {object} next
         * @returns {object} Validation error messages or content of req.body passed to controller
         * @memberof ReviewsValidation
         */
        value: function postReviewValidations(req, res, next) {
            var reviewBody = req.body.reviewBody,
                errors = {};

            if (reviewBody === undefined) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Review for recipe is not defined'
                });
            }
            if (!_validator2.default.isEmpty(reviewBody)) {
                if (!_validator2.default.isLength(reviewBody, { min: 4, max: undefined })) {
                    errors.reviewBody = 'Review provided must be more than 4 characters';
                }
            } else {
                errors.reviewBody = 'Review for recipe is required';
            }

            var result = { isValid: (0, _isEmpty2.default)(errors) };

            if (!result.isValid) {
                return res.status(400).json({ errors: errors });
            }
            next();
        }
    }]);

    return ReviewsValidation;
}();

exports.default = ReviewsValidation;