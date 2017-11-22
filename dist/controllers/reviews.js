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
         * @static
         * @param {object} req
         * @param {object} res
         * @returns {object} insertion error messages or success message
         * @memberof ReviewsApiController
         */
        value: function postReview(req, res) {
            var reviewBody = req.body.reviewBody,
                userId = req.decoded.userId,
                recipeId = req.params.recipeID;

            return Recipes.findById(recipeId).then(function (recipe) {
                if (!recipe) {
                    res.status(400).json({
                        status: 'Failed',
                        message: 'Recipe with id: ' + recipeId + ', not found'
                    });
                }
                if (recipe.userId === userId) {
                    res.status(400).json({
                        status: 'Failed',
                        message: 'Can not post a review for a recipe created by you'
                    });
                }
                return Reviews.create({
                    reviewBody: reviewBody,
                    userId: userId,
                    recipeId: recipeId
                }).then(function (postedReview) {
                    return res.status(201).json({
                        status: 'Success',
                        message: 'Successfully posted a review for recipe with id:' + recipeId,
                        postedReview: postedReview
                    });
                }).catch(function (error) {
                    return res.status(500).json({
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