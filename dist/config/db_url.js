'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

exports.default = {
    development: {
        username: 'postgres',
        password: 'richman',
        database: 'more_recipes',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    test: {
        username: 'postgres',
        password: 'richman',
        database: 'travis_test_db',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    production: {
        use_env_variable: 'DB_URL'
    }
};