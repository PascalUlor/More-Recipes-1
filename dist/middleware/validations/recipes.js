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
 * Validates POST and GET requestuests for recipes route
 * @class RecipesValidation
 */
var RecipesValidation = function () {
    function RecipesValidation() {
        _classCallCheck(this, RecipesValidation);
    }

    _createClass(RecipesValidation, null, [{
        key: 'addRecipeValidations',

        /**
         * Validates all recipe details before allowing access to controller class
         * @memberof RecipesValidation
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         * @param   {object} next      the node/express middleware next object
         *
         * @returns {object} validation error messages object or contents of request.body object
         */
        value: function addRecipeValidations(request, response, next) {
            if (typeof request.body.title === 'undefined' || typeof request.body.ingredients === 'undefined' || typeof request.body.procedures === 'undefined') {
                return response.status(422).json({
                    status: 'Failed',
                    message: 'All or some fields are not defined'
                });
            }

            var title = request.body.title.trim(),
                ingredients = request.body.ingredients.trim(),
                procedures = request.body.procedures.trim(),
                errors = {};

            if (!_validator2.default.isEmpty(title)) {
                var containNumber = title.split('').filter(function (character) {
                    return _validator2.default.toInt(character);
                });
                if (containNumber.length !== 0) {
                    errors.title = 'Recipe title must not contain numbers';
                }
            } else {
                errors.title = 'Recipe title is required';
            }

            if (!_validator2.default.isEmpty(ingredients)) {
                if (!_validator2.default.isLength(ingredients, { min: 20, max: 1000 })) {
                    errors.ingredients = 'Recipe ingredients provided must be atleast 20 to 1000 characters';
                }
            } else {
                errors.ingredients = 'Recipe ingredients are required';
            }

            if (!_validator2.default.isEmpty(procedures)) {
                if (!_validator2.default.isLength(procedures, { min: 30, max: 1000 })) {
                    errors.procedures = 'Recipe procedures provided must be atleast 30 to 1000 characters';
                }
            } else {
                errors.procedures = 'Recipe procedures are required';
            }

            var result = { isValid: (0, _isEmpty2.default)(errors) };

            if (!result.isValid) {
                return response.status(400).json({ errors: errors });
            }
            return next();
        }

        /**
         * Validates updated recipe detail(s) before allowing access to controller class
         * @memberof RecipesValidation
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         * @param   {object} next      the node/express middleware next object
         *
         * @returns {object} validation error messages object or content(s) of request.body object
         */

    }, {
        key: 'updateRecipeValidations',
        value: function updateRecipeValidations(request, response, next) {
            var title = request.body.title.trim(),
                ingredients = request.body.ingredients.trim(),
                procedures = request.body.procedures.trim(),
                recipeId = parseInt(request.params.recipeID.trim(), 10),
                errors = {};

            if (Number.isNaN(recipeId)) {
                errors.recipeId = 'Recipe ID must be a number';
            }

            if (!(title || ingredients || procedures)) {
                return response.status(422).json({
                    status: 'Failed',
                    message: 'Provide a field to update'
                });
            }

            if (title) {
                var containNumber = title.split('').filter(function (character) {
                    return _validator2.default.toInt(character);
                });
                if (containNumber.length !== 0) {
                    errors.title = 'Recipe title must not contain numbers';
                }
            }

            if (ingredients) {
                if (!_validator2.default.isLength(ingredients, { min: 20, max: 1000 })) {
                    errors.ingredients = 'Recipe ingredients provided must be more than 20 characters';
                }
            }

            if (procedures) {
                if (!_validator2.default.isLength(procedures, { min: 30, max: 1000 })) {
                    errors.procedures = 'Recipe procedures provided must be more than 30 characters';
                }
            }

            var result = { isValid: (0, _isEmpty2.default)(errors) };

            if (!result.isValid) {
                return response.status(400).json({ errors: errors });
            }
            return next();
        }

        /**
         * Validates query and non query routes before allowing access to controller class
         * @memberof RecipesValidation
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         * @param   {object} next      the node/express middleware next object
         *
         * @returns {object} validation error messages object or contents of request.query(or nothing)
         */

    }, {
        key: 'getSortdedRecipesValidation',
        value: function getSortdedRecipesValidation(request, response, next) {
            if (!request.originalUrl.includes('?')) {
                return next();
            }

            if (typeof request.query.sort === 'undefined' || typeof request.query.order === 'undefined') {
                return response.status(422).json({
                    status: 'Failed',
                    message: 'Sort or(and) order query parameter(s) is(are) not defined'
                });
            }

            var sort = request.query.sort.trim(),
                order = request.query.order.trim(),
                errors = {};

            if (!_validator2.default.isEmpty(sort)) {
                if (!(sort.toLowerCase() === 'upvotes' || sort.toLowerCase() === 'downvotes')) {
                    errors.sortType = 'Sort query must be either upvotes or downvotes';
                }
            } else {
                errors.sortType = 'Sort query is required';
            }

            if (!_validator2.default.isEmpty(order)) {
                if (!(order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc')) {
                    errors.order = 'Order query must be either asc or desc';
                }
            } else {
                errors.order = 'Order query is required';
            }

            var result = { isValid: (0, _isEmpty2.default)(errors) };

            if (!result.isValid) {
                return response.status(400).json({ errors: errors });
            }
            return next();
        }
    }]);

    return RecipesValidation;
}();

exports.default = RecipesValidation;