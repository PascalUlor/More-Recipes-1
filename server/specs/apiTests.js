 /**
  * API Endpoint Tests for database
  */
 import supertest from 'supertest';
 import chai from 'chai';
 import app from '../app';
 import models from '../models';

 const { expect } = chai,
 request = supertest(app);
 let token;

 models.Users.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });

 models.Recipes.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });

 models.Reviews.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });

 models.Favorites.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });

 models.Upvotes.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });

 models.Downvotes.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });


 describe('All test cases for application', () => {
     describe('Test case for loading application home page', () => {
         it('should load application home page', (done) => {
             request.get('/')
                 .set('Content-Type', 'application/json')
                 .expect(200)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         name: 'Chike',
                         message: 'Welcome to More-Recipes'
                     });
                     if (err) done(err);
                     done();
                 });
         });
     });

     describe('All test cases for invalid routes', () => {
         it('should fail to load application home page', (done) => {
             request.get('/home')
                 .set('Content-Type', 'application/json')
                 .expect(404)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Page not found'
                     });
                     if (err) done(err);
                     done();
                 });
         });

         it('should fail to get route', (done) => {
             request.get('/api/v1')
                 .set('Content-Type', 'application/json')
                 .expect(404)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Page not found'
                     });
                     if (err) done(err);
                     done();
                 });
         });

         it('should return `404` page for all invalid routes', (done) => {
             request.get('/more-recipes/recipes')
                 .set('Content-Type', 'application/json')
                 .expect(404)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Page not found'
                     });
                     if (err) done(err);
                     done();
                 });
         });
     });

     describe('SIGNUP OPERATIONS', () => {
         describe('SIGNUP POSITIVE TESTS', () => {
             it('should be able to create a new user account successfully', (done) => {
                 const user = {
                     fullName: 'Hyginus Chinoke',
                     username: 'chyke',
                     email: 'chyke@gmail.com',
                     password: 'ilovecoding',
                     repassword: 'ilovecoding'
                 };
                 request.post('/api/v1/users/signup')
                     .set('Content-Type', 'application/json')
                     .send(user)
                     .expect(201)
                     .end((err, res) => {
                         expect('Success').to.equal(res.body.status);
                         expect('Successfully created account').to.equal(res.body.message);
                         expect('chyke@gmail.com').to.equal(res.body.data.email);
                         expect('chyke').to.equal(res.body.data.username);
                         if (err) done(err);
                         done();
                     });
             });
             it('should be able to create another new user account successfully', (done) => {
                 const user = {
                     fullName: 'Anna Jones',
                     username: 'annie',
                     email: 'annie@yahoo.com',
                     password: 'ilovecoding',
                     repassword: 'ilovecoding'
                 };
                 request.post('/api/v1/users/signup')
                     .set('Content-Type', 'application/json')
                     .send(user)
                     .expect(201)
                     .end((err, res) => {
                         expect('Success').to.equal(res.body.status);
                         expect('Successfully created account').to.equal(res.body.message);
                         expect('annie@yahoo.com').to.equal(res.body.data.email);
                         expect('annie').to.equal(res.body.data.username);
                         if (err) done(err);
                         done();
                     });
             });
         });
         describe('SIGNUP NEGATIVE TESTS', () => {
             // All required middleware validation tests
             it('should not be able to create a new account when one or more field(s) is(are) undefined(missing)', (done) => {
                 // password field is undefined(missing) in the user object
                 const user = {
                     fullName: 'Anna Jones',
                     username: 'annie',
                     email: 'annie@yahoo.com',
                     repassword: 'ilovecoding'
                 };
                 request.post('/api/v1/users/signup')
                     .set('Content-Type', 'application/json')
                     .send(user)
                     .expect(400)
                     .end((err, res) => {
                         expect(res.body).deep.equal({
                             status: 'Failed',
                             message: 'All or some fields are not defined'
                         });
                         if (err) done(err);
                         done();
                     });
             });
             it('should not be able to create a new account with empty input fields', (done) => {
                 const user = {
                     fullName: '',
                     username: '',
                     email: '',
                     password: '',
                     repassword: ''
                 };
                 request.post('/api/v1/users/signup')
                     .set('Content-Type', 'application/json')
                     .send(user)
                     .expect(400)
                     .end((err, res) => {
                         expect('Full name is required').to.equal(res.body.errors.fullName);
                         expect('Username is required').to.equal(res.body.errors.username);
                         expect('Email is required').to.equal(res.body.errors.email);
                         expect('Password is required').to.equal(res.body.errors.password);
                         if (err) done(err);
                         done();
                     });
             });
             it('Should not be able to create a new account when number(s) begins the fullname and username fields, email field is invalid and password length is not between 8 and 30', (done) => {
                 const user = {
                     fullName: '25Anna Jones',
                     username: '16_annie',
                     email: 'annie@yahoo',
                     password: 'coding',
                     repassword: 'coding'
                 };
                 request.post('/api/v1/users/signup')
                     .set('Content-Type', 'application/json')
                     .send(user)
                     .expect(400)
                     .end((err, res) => {
                         expect('Full name should not start with number(s)').to.equal(res.body.errors.fullName);
                         expect('Username should not start with number(s)').to.equal(res.body.errors.username);
                         expect('Email is invalid').to.equal(res.body.errors.email);
                         expect('Password length must be between 8 and 30').to.equal(res.body.errors.password);
                         if (err) done(err);
                         done();
                     });
             });
             it('Should not be able to create a new account with mismatching password and confirm password fields', (done) => {
                 const user = {
                     fullName: 'Anna Jones',
                     username: 'annie',
                     email: 'annie@yahoo.com',
                     password: 'ilovecoding',
                     repassword: 'ilovecodingmore'
                 };
                 request.post('/api/v1/users/signup')
                     .set('Content-Type', 'application/json')
                     .send(user)
                     .expect(400)
                     .end((err, res) => {
                         expect('Password and confirm password fields mismatched').to.equal(res.body.errors.password);
                         if (err) done(err);
                         done();
                     });
             });
             // Controller validation test
             it('Should not be able to create a new account with an existing username record', (done) => {
                 // same records from second successful sign up
                 const user = {
                     fullName: 'Anna Jones',
                     username: 'annie',
                     email: 'annie@yahoo.com',
                     password: 'ilovecoding',
                     repassword: 'ilovecoding'
                 };
                 request.post('/api/v1/users/signup')
                     .send(user)
                     .expect(400)
                     .end((err, res) => {
                         expect(res.body).deep.equal({
                             status: 'Failed',
                             message: 'Username already exist'
                         });
                         if (err) done(err);
                         done();
                     });
             });
             it('Should not be able to create a new account with an existing email record', (done) => {
                 // same records from second successful sign up
                 const user = {
                     fullName: 'Anna Jones',
                     username: 'anniebella',
                     email: 'annie@yahoo.com',
                     password: 'ilovecoding',
                     repassword: 'ilovecoding'
                 };
                 request.post('/api/v1/users/signup')
                     .send(user)
                     .expect(400)
                     .end((err, res) => {
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

     describe('SIGNIN NEGATIVE OPERATIONS', () => {
         it('Should not be able to login when one or more field(s) is(are) undefined(missing)', (done) => {
             // username field is missing
             const user = { password: 'ilovecoding' };
             request.post('/api/v1/users/signin')
                 .set('Content-Type', 'application/json')
                 .send(user)
                 .expect(400)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Username or(and) password field(s) is(are) not defined'
                     });
                     if (err) done(err);
                     done();
                 });
         });
         it('Should not be able to login with empty input fields', (done) => {
             const user = { username: '', password: '' };
             request.post('/api/v1/users/signin')
                 .set('Content-Type', 'application/json')
                 .send(user)
                 .expect(400)
                 .end((err, res) => {
                     expect('Username is required').to.equal(res.body.errors.username);
                     expect('Password is required').to.equal(res.body.errors.password);
                     if (err) done(err);
                     done();
                 });
         });
         it('Should not be able to login with wrong username', (done) => {
             const user = { username: 'wrongUserName', password: 'ilovecoding' };
             request.post('/api/v1/users/signin')
                 .set('Content-Type', 'application/json')
                 .send(user)
                 .expect(404)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'User not found'
                     });
                     if (err) done(err);
                     done();
                 });
         });
         it('Should not be able to login with wrong password', (done) => {
             const user = { username: 'annie', password: 'ihatecoding' };
             request.post('/api/v1/users/signin')
                 .set('Content-Type', 'application/json')
                 .send(user)
                 .expect(400)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Invalid Password'
                     });
                     if (err) done(err);
                     done();
                 });
         });
     });
     describe('SIGNIN POSITIVE OPERATION', () => {
         it('Should be able to login to account created with valid credentials', (done) => {
             const user = { username: 'annie', password: 'ilovecoding' };
             request.post('/api/v1/users/signin')
                 .set('Content-Type', 'application/json')
                 .send(user)
                 .expect(200)
                 .end((err, res) => {
                     token = res.body.token;
                     expect('annie').to.equal(res.body.data.username);
                     expect('You are now logged In').to.equal(res.body.message);
                     done();
                 });
         });
     });
 });