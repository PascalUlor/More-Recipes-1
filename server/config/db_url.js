const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_DEV,
        host: process.env.HOST,
        dialect: process.env.DIALECT
    },
    test: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_TEST,
        host: process.env.HOST,
        dialect: process.env.DIALECT
    },
    production: {
        use_env_variable: 'DATABASE_URL'
    }
};