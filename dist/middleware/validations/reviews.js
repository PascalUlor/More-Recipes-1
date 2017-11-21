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
 * Validates all requestuests for reviews route
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
         * @memberof ReviewsValidation
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         * @param   {object} next      the node/express middleware next object
         *
         * @returns {object} validation error messages object or content of request.body object passed to controller
         */
        value: function postReviewValidations(request, response, next) {
            if (typeof request.body.reviewBody === 'undefined') {
                return response.status(422).json({
                    status: 'Failed',
                    message: 'Review for recipe is not defined or is missing'
                });
            }

            var reviewBody = request.body.reviewBody.trim(),
                recipeId = parseInt(request.params.recipeID, 10),
                errors = {};

            if (!_validator2.default.isEmpty(reviewBody)) {
                if (!_validator2.default.isLength(reviewBody, { min: 4, max: undefined })) {
                    errors.reviewBody = 'Review provided must be atleast 4 characters';
                }
            } else {
                errors.reviewBody = 'Review for recipe is required';
            }

            if (Number.isNaN(recipeId)) {
                errors.recipeId = 'Recipe ID must be a number';
            }

            var result = { isValid: (0, _isEmpty2.default)(errors) };

            if (!result.isValid) {
                return response.status(400).json({ errors: errors });
            }
            return next();
        }
    }]);

    return ReviewsValidation;
}();

exports.default = ReviewsValidation;