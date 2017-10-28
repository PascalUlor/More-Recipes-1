'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * API Endpoint Tests for database
 */
var expect = _chai2.default.expect,
    wrongToken = 'wrongAccessToken',
    request = (0, _supertest2.default)(_app2.default);

var pageToken1 = void 0;

_models2.default.Users.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
});

_models2.default.Recipes.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
});

_models2.default.Reviews.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
});

_models2.default.Favorites.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
});

_models2.default.Upvotes.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
});

_models2.default.Downvotes.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
});

describe('All test cases for application', function () {
    describe('Test case for loading application home page', function () {
        it('should load application home page', function (done) {
            request.get('/').set('Content-Type', 'application/json').expect(200).end(function (err, res) {
                expect(res.body).deep.equal({
                    project: 'More-Recipes',
                    message: 'Share your awesome recipes ideas'
                });
                if (err) done(err);
                done();
            });
        });
    });

    describe('All test cases for invalid routes', function () {
        it('should fail to load application home page', function (done) {
            request.get('/home').set('Content-Type', 'application/json').expect(404).end(function (err, res) {
                expect(res.body).deep.equal({
                    status: 'Failed',
                    message: 'Page not found'
                });
                if (err) done(err);
                done();
            });
        });

        it('should fail to get route', function (done) {
            request.get('/api/v1').set('Content-Type', 'application/json').expect(404).end(function (err, res) {
                expect(res.body).deep.equal({
                    status: 'Failed',
                    message: 'Page not found'
                });
                if (err) done(err);
                done();
            });
        });

        it('should return `404` page for all invalid routes', function (done) {
            request.get('/more-recipes/recipes').set('Content-Type', 'application/json').expect(404).end(function (err, res) {
                expect(res.body).deep.equal({
                    status: 'Failed',
                    message: 'Page not found'
                });
                if (err) done(err);
                done();
            });
        });
    });

    describe('SIGNUP OPERATIONS', function () {
        describe('SIGNUP POSITIVE TESTS', function () {
            it('should be able to create a new user account successfully', function (done) {
                var user = {
                    fullName: 'Hyginus Chinoke',
                    username: 'chyke',
                    email: 'chyke@gmail.com',
                    password: 'ilovecoding',
                    repassword: 'ilovecoding'
                };
                request.post('/api/v1/users/signup').set('Content-Type', 'application/json').send(user).expect(201).end(function (err, res) {
                    expect('Success').to.equal(res.body.status);
                    expect('Successfully created account').to.equal(res.body.message);
                    expect('chyke@gmail.com').to.equal(res.body.data.email);
                    expect('chyke').to.equal(res.body.data.username);
                    if (err) done(err);
                    done();
                });
            });
            it('should be able to create another new user account successfully', function (done) {
                var user = {
                    fullName: 'Anna Jones',
                    username: 'annie',
                    email: 'annie@yahoo.com',
                    password: 'ilovecoding',
                    repassword: 'ilovecoding'
                };
                request.post('/api/v1/users/signup').set('Content-Type', 'application/json').send(user).expect(201).end(function (err, res) {
                    expect('Success').to.equal(res.body.status);
                    expect('Successfully created account').to.equal(res.body.message);
                    expect('annie@yahoo.com').to.equal(res.body.data.email);
                    expect('annie').to.equal(res.body.data.username);
                    if (err) done(err);
                    done();
                });
            });
        });
        describe('SIGNUP NEGATIVE TESTS', function () {
            // All required middleware validation tests
            it('should not be able to create a new account when one or more field(s) is(are) undefined(missing)', function (done) {
                // password field is undefined(missing) in the user object
                var user = {
                    fullName: 'Anna Jones',
                    username: 'annie',
                    email: 'annie@yahoo.com',
                    repassword: 'ilovecoding'
                };
                request.post('/api/v1/users/signup').set('Content-Type', 'application/json').send(user).expect(400).end(function (err, res) {
                    expect(res.body).deep.equal({
                        status: 'Failed',
                        message: 'All or some fields are not defined'
                    });
                    if (err) done(err);
                    done();
                });
            });
            it('should not be able to create a new account with empty input fields', function (done) {
                var user = {
                    fullName: '',
                    username: '',
                    email: '',
                    password: '',
                    repassword: ''
                };
                request.post('/api/v1/users/signup').set('Content-Type', 'application/json').send(user).expect(400).end(function (err, res) {
                    expect('Full name is required').to.equal(res.body.errors.fullName);
                    expect('Username is required').to.equal(res.body.errors.username);
                    expect('Email is required').to.equal(res.body.errors.email);
                    expect('Password is required').to.equal(res.body.errors.password);
                    if (err) done(err);
                    done();
                });
            });
            it('Should not be able to create a new account when number(s) begins the fullname and username fields, email field is invalid and password length is not between 8 and 30', function (done) {
                var user = {
                    fullName: '25Anna Jones',
                    username: '16_annie',
                    email: 'annie@yahoo',
                    password: 'coding',
                    repassword: 'coding'
                };
                request.post('/api/v1/users/signup').set('Content-Type', 'application/json').send(user).expect(400).end(function (err, res) {
                    expect('Full name should not start with number(s)').to.equal(res.body.errors.fullName);
                    expect('Username should not start with number(s)').to.equal(res.body.errors.username);
                    expect('Email is invalid').to.equal(res.body.errors.email);
                    expect('Password length must be between 8 and 30').to.equal(res.body.errors.password);
                    if (err) done(err);
                    done();
                });
            });
            it('Should not be able to create a new account with mismatching password and confirm password fields', function (done) {
                var user = {
                    fullName: 'Anna Jones',
                    username: 'annie',
                    email: 'annie@yahoo.com',
                    password: 'ilovecoding',
                    repassword: 'ilovecodingmore'
                };
                request.post('/api/v1/users/signup').set('Content-Type', 'application/json').send(user).expect(400).end(function (err, res) {
                    expect('Password and confirm password fields mismatched').to.equal(res.body.errors.password);
                    if (err) done(err);
                    done();
                });
            });
            // Controller validation test
            it('Should not be able to create a new account with an existing username record', function (done) {
                // same records from second successful sign up
                var user = {
                    fullName: 'Anna Jones',
                    username: 'annie',
                    email: 'annie@yahoo.com',
                    password: 'ilovecoding',
                    repassword: 'ilovecoding'
                };
                request.post('/api/v1/users/signup').send(user).expect(400).end(function (err, res) {
                    expect(res.body).deep.equal({
                        status: 'Failed',
                        message: 'Username already exist'
                    });
                    if (err) done(err);
                    done();
                });
            });
            it('Should not be able to create a new account with an existing email record', function (done) {
                // same records from second successful sign up
                var user = {
                    fullName: 'Anna Jones',
                    username: 'anniebella',
                    email: 'annie@yahoo.com',
                    password: 'ilovecoding',
                    repassword: 'ilovecoding'
                };
                request.post('/api/v1/users/signup').send(user).expect(400).end(function (err, res) {
                    expect(res.body).deep.equal({
                        status: 'Failed',
                        message: 'Email already exist'
                    });
                    if (err) done(err);
                    done();
                });
            });
        });
    });

    describe('SIGNIN NEGATIVE OPERATIONS', function () {
        it('Should not be able to login when one or more field(s) is(are) undefined(missing)', function (done) {
            // username field is missing
            var user = { password: 'ilovecoding' };
            request.post('/api/v1/users/signin').set('Content-Type', 'application/json').send(user).expect(400).end(function (err, res) {
                expect(res.body).deep.equal({
                    status: 'Failed',
                    message: 'Username or(and) password field(s) is(are) not defined'
                });
                if (err) done(err);
                done();
            });
        });
        it('Should not be able to login with empty input fields', function (done) {
            var user = { username: '', password: '' };
            request.post('/api/v1/users/signin').set('Content-Type', 'application/json').send(user).expect(400).end(function (err, res) {
                expect('Username is required').to.equal(res.body.errors.username);
                expect('Password is required').to.equal(res.body.errors.password);
                if (err) done(err);
                done();
            });
        });
        it('Should not be able to login with wrong username', function (done) {
            var user = { username: 'wrongUserName', password: 'ilovecoding' };
            request.post('/api/v1/users/signin').set('Content-Type', 'application/json').send(user).expect(404).end(function (err, res) {
                expect(res.body).deep.equal({
                    status: 'Failed',
                    message: 'User not found'
                });
                if (err) done(err);
                done();
            });
        });
        it('Should not be able to login with wrong password', function (done) {
            var user = { username: 'annie', password: 'ihatecoding' };
            request.post('/api/v1/users/signin').set('Content-Type', 'application/json').send(user).expect(400).end(function (err, res) {
                expect(res.body).deep.equal({
                    status: 'Failed',
                    message: 'Invalid username or password'
                });
                if (err) done(err);
                done();
            });
        });
    });
    describe('SIGNIN POSITIVE OPERATION', function () {
        it('Should be able to login to account created with valid credentials', function (done) {
            var user = { username: 'annie', password: 'ilovecoding' };
            request.post('/api/v1/users/signin').set('Content-Type', 'application/json').send(user).expect(200).end(function (err, res) {
                pageToken1 = res.body.token;
                expect('annie').to.equal(res.body.data.username);
                expect('You are now logged In').to.equal(res.body.message);
                done();
            });
        });
    });

    describe('Create/Add recipe negative operations', function () {
        it('should not be able to access the recipes page when security token is undefined(not set)', function (done) {
            var recipeBody = { title: 'title of recipe' };
            request.post('/api/v1/recipes').send(recipeBody).expect(403).end(function (err, res) {
                expect(res.body).deep.equal({
                    status: 'Failed',
                    message: 'Access denied. You are not logged in'
                });
                if (err) done(err);
                done();
            });
        });
        it('should not be able to access the recipes page with a wrong security token', function (done) {
            var recipeBody = { title: 'title of recipe' };
            request.post('/api/v1/recipes').set('x-access-token', wrongToken).send(recipeBody).expect(401).end(function (err, res) {
                expect(res.body).deep.equal({
                    status: 'Failed',
                    message: 'Authentication failed. Token is invalid or expired'
                });
                if (err) done(err);
                done();
            });
        });
        it('should not be able to create recipe when one or more field(s) is(are) undefined(missing)', function (done) {
            // ingredients and procedures fields are undefined(missing)
            var recipeBody = { title: 'title of recipe' };
            request.post('/api/v1/recipes').set('x-access-token', pageToken1).send(recipeBody).expect(400).end(function (err, res) {
                expect(res.body).deep.equal({
                    status: 'Failed',
                    message: 'All or some fields are not defined'
                });
                if (err) done(err);
                done();
            });
        });
        it('should not be able to create recipe with empty input fields', function (done) {
            var recipeBody = { title: '', ingredients: '', procedures: '' };
            request.post('/api/v1/recipes').set('x-access-token', pageToken1).send(recipeBody).expect(400).end(function (err, res) {
                expect('Title of recipe is required').to.equal(res.body.errors.title);
                expect('Recipe ingredients are required').to.equal(res.body.errors.ingredients);
                expect('Procedures for your recipe are required').to.equal(res.body.errors.procedures);
                if (err) done(err);
                done();
            });
        });
        it('Should not be able to create recipe when number begins recipe title, ingredients characters length is less than 20 and procedures characters length is less than 20', function (done) {
            var recipeBody = { title: '24African Salad', ingredients: 'onions', procedures: 'Boil water' };
            request.post('/api/v1/recipes').set('x-access-token', pageToken1).send(recipeBody).expect(400).end(function (err, res) {
                expect('Title should not start with number(s)').to.equal(res.body.errors.title);
                expect('Recipe ingredients provided must be more than 20 characters').to.equal(res.body.errors.ingredients);
                expect('Procedures provided must be more than 20 characters').to.equal(res.body.errors.procedures);
                if (err) done(err);
                done();
            });
        });
    });
    describe('Create/Add recipe positive operations', function () {
        it('should be able to create recipe when all validations are met', function (done) {
            var recipeBody = { title: 'African Salad', ingredients: 'onions, vegetables, carrots, salt', procedures: 'Boil water for about 20 minutes. Cut carrots into considerable sizes...' };
            request.post('/api/v1/recipes').set('x-access-token', pageToken1).send(recipeBody).expect(201).end(function (err, res) {
                expect('Successfully added new recipe').to.equal(res.body.message);
                if (err) done(err);
                done();
            });
        });
        it('should be able to create another recipe when all validations are met', function (done) {
            var recipeBody = { title: 'French Fries', ingredients: 'onions, vegetables, carrots, salt', procedures: 'Boil water for about 20 minutes. Cut carrots into considerable sizes...' };
            request.post('/api/v1/recipes').set('x-access-token', pageToken1).send(recipeBody).expect(201).end(function (err, res) {
                expect('Successfully added new recipe').to.equal(res.body.message);
                if (err) done(err);
                done();
            });
        });
    });
});