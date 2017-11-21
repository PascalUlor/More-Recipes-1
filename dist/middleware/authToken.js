'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

/**
 * Ensures all routes are protected
 * @function
 *
 * @param   {object} request   the server/http(s) request object
 * @param   {object} response  the server/http(s) response object
 * @param   {object} next      the node/express middleware next object
 *
 * @returns {object} failure error message object on denied requestuest or user decoded data object on granted requestuest
 */
var authToken = function authToken(request, response, next) {
    var token = request.body.token || request.query.token || request.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies token and checks if expired or invalid
        _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                response.status(401).json({
                    status: 'Failed',
                    message: 'Authentication failed. Token is invalid or expired'
                });
            } else {
                // if everything is authentication is valid, save to requestuest for use in other routes
                request.decoded = decoded;
                next();
            }
        });
    } else {
        response.status(403).json({
            status: 'Failed',
            message: 'Access denied. You are not logged in'
        });
    }
};

exports.default = authToken;