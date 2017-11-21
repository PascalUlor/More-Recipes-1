'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipes = _models2.default.Recipes,
    Reviews = _models2.default.Reviews;

/**
 * Class Definition for the Review Route
 * @class ReviewsApiController
 */

var ReviewsApiController = function () {
    function ReviewsApiController() {
        _classCallCheck(this, ReviewsApiController);
    }

    _createClass(ReviewsApiController, null, [{
        key: 'postReview',

        /**
         * Post a review for a recipe
         * @memberof ReviewsApiController
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         *
         * @returns {object} insertion error messages object or success message object
         */
        value: function postReview(request, response) {
            var reviewBody = request.body.reviewBody,
                userId = request.decoded.userId,
                recipeId = parseInt(request.params.recipeID.trim(), 10);

            return Recipes.findById(recipeId).then(function (recipe) {
                if (!recipe) {
                    return response.status(404).json({
                        status: 'Failed',
                        message: 'Recipe with id: ' + recipeId + ', not found'
                    });
                }
                return Reviews.create({
                    reviewBody: reviewBody,
                    userId: userId,
                    recipeId: recipeId
                }).then(function (postedReview) {
                    return response.status(201).json({
                        status: 'Success',
                        message: 'Successfully posted a review for recipe with id:' + recipeId,
                        postedReview: postedReview
                    });
                }).catch(function (error) {
                    return response.status(500).json({
                        status: 'Failed',
                        message: error.message
                    });
                });
            });
        }
    }]);

    return ReviewsApiController;
}();

exports.default = ReviewsApiController;