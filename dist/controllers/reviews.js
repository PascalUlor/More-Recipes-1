'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class Definition for the Review Route
 * @class Review
 */
var Review = function () {
    function Review() {
        _classCallCheck(this, Review);
    }

    _createClass(Review, null, [{
        key: 'postReview',

        /**
         * Post a review on a recipe
         * @param {object} req
         * @param {object} res
         * @returns {object} insertion error messages or success messages
         */
        value: function postReview(req, res) {
            var reviewBody = req.body.reviewBody,
                userId = req.decoded.userId,
                recipeId = req.params.recipeID;

            _models2.default.Recipes.findById(recipeId).then(function (recipe) {
                if (recipe) {
                    if (recipe.userId === userId) {
                        return res.status(400).json({
                            status: 'Failed',
                            message: 'You can not post a review for a recipe created by you'
                        });
                    }
                    _models2.default.Reviews.create({
                        reviewBody: reviewBody,
                        userId: userId,
                        recipeId: recipeId
                    }).then(function (postedReview) {
                        res.status(201).json({
                            status: 'Success',
                            message: 'Successfully posted a review for recipe with id:' + recipeId,
                            postedReview: postedReview
                        });
                    }).catch(function (err) {
                        if (err) {
                            res.status(500).json({ message: 'Error posting review' });
                        }
                    });
                } else {
                    return res.status(400).json({
                        status: 'Failed',
                        message: 'Recipe with id: ' + recipeId + ', is not available'
                    });
                }
            });
        }
    }]);

    return Review;
}();

exports.default = Review;