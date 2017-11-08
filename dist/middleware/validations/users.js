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
         * @static
         * @param {object} req
         * @param {object} res
         * @param {object} next
         * @returns {object} Validation error messages or contents of req.body
         * @memberof UserValidations
         */
        value: function signup(req, res, next) {
            var _req$body = req.body,
                fullName = _req$body.fullName,
                username = _req$body.username,
                email = _req$body.email,
                password = _req$body.password,
                repassword = _req$body.repassword,
                errors = {};

            if (fullName === undefined || username === undefined || email === undefined || password === undefined || repassword === undefined) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'All or some fields are not defined'
                });
            }

            if (!_validator2.default.isEmpty(fullName)) {
                for (var character = 0; character < fullName.length; character += 1) {
                    if (_validator2.default.toInt(fullName[character])) {
                        errors.fullName = 'Full name must not contain numbers';
                        break;
                    }
                }
            } else {
                errors.fullName = 'Full name is required';
            }

            if (!_validator2.default.isEmpty(username)) {
                if (_validator2.default.toInt(username)) {
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
                return res.status(400).json({ errors: errors });
            }
            next();
        }

        /**
         * Validates signin form input fields before allowing access to controller class
         * @static
         * @param {object} req
         * @param {object} res
         * @param {object} next
         * @returns {object} Validation error messages or contents of req.body
         * @memberof UserValidations
         */

    }, {
        key: 'signin',
        value: function signin(req, res, next) {
            var _req$body2 = req.body,
                username = _req$body2.username,
                password = _req$body2.password,
                errors = {};

            if (username === undefined || password === undefined) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Username or(and) password field(s) is(are) not defined'
                });
            }

            if (_validator2.default.isEmpty(username)) {
                errors.username = 'Username is required';
            }

            if (_validator2.default.isEmpty(password)) {
                errors.password = 'Password is required';
            }

            var result = { isValid: (0, _isEmpty2.default)(errors) };

            if (!result.isValid) {
                return res.status(400).json({ errors: errors });
            }
            next();
        }
    }]);

    return UserValidations;
}();

exports.default = UserValidations;