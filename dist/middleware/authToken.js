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
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @returns {obj} Failure error message on denied request or User decoded data on granted request
 */
var authToken = function authToken(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies token and checks if expired or invalid
        _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                res.status(401);
                res.json({
                    status: 'Failed',
                    message: 'Authentication failed. Token is invalid or expired'
                });
            } else {
                // if everything is authentication is valid, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403);
        res.json({
            status: 'Failed',
            message: 'Access denied. You are not logged in'
        });
    }
};

exports.default = authToken;