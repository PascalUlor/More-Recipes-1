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
 * Validates users signup and signin operations
 * @class Validation
 */
var UserValidations = function () {
    function UserValidations() {
        _classCallCheck(this, UserValidations);
    }

    _createClass(UserValidations, null, [{
        key: 'signup',

        /**
         * Validates all User signup details before allowing access to controller class
         * @memberof UserValidations
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         * @param   {object} next      the node/express middleware next object
         *
         * @returns {object} validation error messages object or contents of request.body object
         */
        value: function signup(request, response, next) {
            if (typeof request.body.fullName === 'undefined' || typeof request.body.username === 'undefined' || typeof request.body.email === 'undefined' || typeof request.body.password === 'undefined' || typeof request.body.repassword === 'undefined') {
                return response.status(422).json({
                    status: 'Failed',
                    message: 'All or some fields are not defined'
                });
            }
            var fullName = request.body.fullName.trim(),
                username = request.body.username.trim(),
                email = request.body.email.trim(),
                password = request.body.password.trim(),
                repassword = request.body.repassword.trim(),
                errors = {};
            if (!_validator2.default.isEmpty(fullName)) {
                var containNumber = fullName.split('').filter(function (character) {
                    return _validator2.default.toInt(character);
                });
                if (containNumber.length !== 0) {
                    errors.fullName = 'Full name must not contain numbers';
                }
            } else {
                errors.fullName = 'Full name is required';
            }

            if (!_validator2.default.isEmpty(username)) {
                if (!_validator2.default.toInt(username)) {
                    if (!_validator2.default.isLength(username, { min: 4, max: 25 })) {
                        errors.username = 'Username must be atleast 4 to 25 characters';
                    }
                } else {
                    errors.username = 'Username must not start with number(s)';
                }
            } else {
                errors.username = 'Username is required';
            }

            if (!_validator2.default.isEmpty(email)) {
                if (!_validator2.default.isEmail(email)) {
                    errors.email = 'Email is invalid';
                }
            } else {
                errors.email = 'Email is required';
            }

            if (!_validator2.default.isEmpty(password)) {
                if (!_validator2.default.isLength(password, { min: 8, max: 30 })) {
                    errors.password = 'Password length must be between 8 and 30';
                }
            } else {
                errors.password = 'Password is required';
            }

            if (!_validator2.default.isEmpty(repassword)) {
                if (!_validator2.default.equals(_validator2.default.trim(repassword), _validator2.default.trim(password))) {
                    errors.repassword = 'Password mismatched';
                }
            } else {
                errors.repassword = 'Password confirmation is required';
            }

            var result = { isValid: (0, _isEmpty2.default)(errors) };

            if (!result.isValid) {
                return response.status(400).json({ errors: errors });
            }
            return next();
        }

        /**
         * Validates signin form input fields before allowing access to controller class
         * @memberof UserValidations
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         * @param   {object} next      the node/express middleware next object
         *
         * @returns {object} validation error messages object or contents of request.body object
         */

    }, {
        key: 'signin',
        value: function signin(request, response, next) {
            if (typeof request.body.username === 'undefined' || typeof request.body.password === 'undefined') {
                return response.status(422).json({
                    status: 'Failed',
                    message: 'Username or(and) password field(s) is(are) not defined'
                });
            }

            var username = request.body.username.trim(),
                password = request.body.password.trim(),
                errors = {};

            if (_validator2.default.isEmpty(username)) {
                errors.username = 'Username is required';
            }

            if (_validator2.default.isEmpty(password)) {
                errors.password = 'Password is required';
            }

            var result = { isValid: (0, _isEmpty2.default)(errors) };

            if (!result.isValid) {
                return response.status(400).json({ errors: errors });
            }
            return next();
        }
    }]);

    return UserValidations;
}();

exports.default = UserValidations;