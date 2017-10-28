import dotenv from 'dotenv';

dotenv.config();

export default {
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