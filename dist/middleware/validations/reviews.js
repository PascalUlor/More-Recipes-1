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
        key: 'addReviewsValidation',

        /**
         * Validates all reviews details before allowing access to controller class
         * @param {object} req
         * @param {object} res
         * @param {object} next
         * @returns {object} Validation error messages or content of req.body passed to controller
         */
        value: function addReviewsValidation(req, res, next) {
            var reviewBody = req.body.reviewBody,
                errors = {};
            // check for undefined inputs
            if (reviewBody === undefined) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Review body field is not defined'
                });
            }
            // validation for review body
            if (_validator2.default.isEmpty(reviewBody)) {
                errors.reviewBody = 'Review body is required';
            }

            var result = { isValid: (0, _isEmpty2.default)(errors) };

            if (!result.isValid) {
                res.status(400).json({ errors: errors });
            } else {
                next();
            }
        }
    }]);

    return ReviewsValidation;
}();

exports.default = ReviewsValidation;