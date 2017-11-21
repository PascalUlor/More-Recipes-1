'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = _models2.default.Users;


_dotenv2.default.config();

/**
 * @class UsersApiController
 */

var UsersApiController = function () {
    function UsersApiController() {
        _classCallCheck(this, UsersApiController);
    }

    _createClass(UsersApiController, null, [{
        key: 'signup',

        /**
         * Users details are captured and persisted on the database
         * @memberof UsersApiController
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         *
         * @returns {object} failure message object or success message object with the persisted database data
         */
        value: function signup(request, response) {
            var _request$body = request.body,
                fullName = _request$body.fullName,
                username = _request$body.username,
                email = _request$body.email;


            return Users.findOne({
                where: {
                    $or: [{
                        username: {
                            $iLike: username
                        }
                    }, {
                        email: {
                            $iLike: email
                        }
                    }]
                }
            }).then(function (foundUser) {
                var errorField = void 0;
                if (foundUser) {
                    if (foundUser.username === username) {
                        errorField = 'Username';
                    } else {
                        errorField = 'Email';
                    }
                    return response.status(409).json({
                        status: 'Failed',
                        message: errorField + ' already exist'
                    });
                }
                var saltRounds = 10;
                _bcryptjs2.default.genSalt(saltRounds, function (err, salt) {
                    _bcryptjs2.default.hash(request.body.password, salt, function (err, hash) {
                        Users.create({
                            fullName: fullName,
                            username: username,
                            email: email,
                            password: hash
                        }).then(function (user) {
                            var payload = { fullName: user.fullName, username: user.username, userId: user.id };
                            var token = _jsonwebtoken2.default.sign(payload, process.env.SECRET_KEY, {
                                expiresIn: 60 * 60 * 8
                            });
                            request.token = token;
                            return response.status(201).json({
                                status: 'Success',
                                message: 'Successfully created account',
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email
                                },
                                token: token
                            });
                        });
                    });
                });
            }).catch(function (error) {
                return response.status(500).json({
                    status: 'Failed',
                    message: error.message
                });
            });
        }

        /**
         * User details are captured and authenticated against persisted database data
         * @memberof UsersApiController
         * @static
         *
         * @param   {object} request   the server/http(s) request object
         * @param   {object} response  the server/http(s) response object
         *
         * @returns {object} Failure message or Success message with persisted database data
         */

    }, {
        key: 'signin',
        value: function signin(request, response) {
            var _request$body2 = request.body,
                username = _request$body2.username,
                password = _request$body2.password;


            return Users.findOne({
                where: {
                    username: {
                        $iLike: username
                    }
                }
            }).then(function (user) {
                if (user && user.username.toLowerCase === username.toLowerCase) {
                    var check = _bcryptjs2.default.compareSync(password, user.password);
                    if (check) {
                        var payload = { fullName: user.fullName, username: user.username, userId: user.id };
                        var token = _jsonwebtoken2.default.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 60 * 60 * 8
                        });
                        request.token = token;
                        return response.status(200).json({
                            status: 'Success',
                            message: 'You are now logged In',
                            user: {
                                id: user.id,
                                username: user.username
                            },
                            token: token
                        });
                    }
                    return response.status(401).json({
                        status: 'Failed',
                        message: 'Invalid username or password'
                    });
                }
                return response.status(404).json({
                    status: 'Failed',
                    message: 'User not found'
                });
            }).catch(function (error) {
                return response.status(500).json({
                    status: 'Failed',
                    message: error.message
                });
            });
        }
    }]);

    return UsersApiController;
}();

exports.default = UsersApiController;