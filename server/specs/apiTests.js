 /**
  * API Endpoint Tests for database
  */
 import supertest from 'supertest';
 import chai from 'chai';
 import app from '../app';
 import models from '../models';

 const { expect } = chai, {
     Users,
     Recipes,
     Favorites,
     Reviews,
     Votes,
 } = models,
 wrongToken = 'wrongAccessToken',
     request = supertest(app);
 let pageToken1, pageToken2;

 Users.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });

 Recipes.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });

 Reviews.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });

 Favorites.destroy({
     cascade: true,
     truncate: true,
     restartIdentity: true
 });

 Votes.destroy({
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
                         project: 'More-Recipes',
                         message: 'Share your awesome recipes ideas'
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
                     fullName: 'Hyginus Chinwoke',
                     username: 'chyke',
                     email: 'chyke@gmail.com',
                     password: 'ilovecoding',
                     repassword: 'ilovecoding'
                 };
                 request.post('/api/v1/users/signup')
                     .set('Content-Type', 'application/x-www-form-urlencoded')
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
             it('Should not be able to create a new account when fullname field contains number(s), username field starts with a number, email field is invalid and password length is not between 8 and 30', (done) => {
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
                         expect('Full name must not contain numbers').to.equal(res.body.errors.fullName);
                         expect('Username must not start with number(s)').to.equal(res.body.errors.username);
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
                         expect('Password mismatched').to.equal(res.body.errors.repassword);
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
                         message: 'Invalid username or password'
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
                     pageToken1 = res.body.token;
                     expect('annie').to.equal(res.body.data.username);
                     expect('You are now logged In').to.equal(res.body.message);
                     done();
                 });
         });
     });

     describe('Create/Add recipe negative operations', () => {
         it('should not be able to access the recipes page when security token is undefined(not set)', (done) => {
             const recipeBody = { title: 'title of recipe' };
             request.post('/api/v1/recipes')
                 .send(recipeBody)
                 .expect(403)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Access denied. You are not logged in'
                     });
                     if (err) done(err);
                     done();
                 });
         });
         it('should not be able to access the recipes page with a wrong security token', (done) => {
             const recipeBody = { title: 'title of recipe' };
             request.post('/api/v1/recipes')
                 .set('x-access-token', wrongToken)
                 .send(recipeBody)
                 .expect(401)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Authentication failed. Token is invalid or expired'
                     });
                     if (err) done(err);
                     done();
                 });
         });
         it('should not be able to create recipe when one or more field(s) is(are) undefined(missing)', (done) => {
             // ingredients and procedures fields are undefined(missing)
             const recipeBody = { title: 'title of recipe' };
             request.post('/api/v1/recipes')
                 .set('x-access-token', pageToken1)
                 .send(recipeBody)
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
         it('should not be able to create recipe with empty input fields', (done) => {
             const recipeBody = { title: '', ingredients: '', procedures: '' };
             request.post('/api/v1/recipes')
                 .set('x-access-token', pageToken1)
                 .send(recipeBody)
                 .expect(400)
                 .end((err, res) => {
                     expect('Recipe title is required').to.equal(res.body.errors.title);
                     expect('Recipe ingredients are required').to.equal(res.body.errors.ingredients);
                     expect('Recipe procedures are required').to.equal(res.body.errors.procedures);
                     if (err) done(err);
                     done();
                 });
         });
         it('Should not be able to create recipe when recipe title contains number(s), ingredients characters length is less than 20 and procedures characters length is less than 20', (done) => {
             const recipeBody = { title: '24African Salad', ingredients: 'onions', procedures: 'Boil water' };
             request.post('/api/v1/recipes')
                 .set('x-access-token', pageToken1)
                 .send(recipeBody)
                 .expect(400)
                 .end((err, res) => {
                     expect('Recipe title must not contain numbers').to.equal(res.body.errors.title);
                     expect('Recipe ingredients provided must be more than 20 characters').to.equal(res.body.errors.ingredients);
                     expect('Recipe procedures provided must be more than 30 characters').to.equal(res.body.errors.procedures);
                     if (err) done(err);
                     done();
                 });
         });
     });
     describe('Create/Add recipe positive operations', () => {
         it('should be able to create recipe when all validations are met', (done) => {
             const recipeBody = { title: 'African Salad', ingredients: 'onions, vegetables, carrots, salt', procedures: 'Boil water for about 20 minutes. Cut carrots into considerable sizes...' };
             request.post('/api/v1/recipes')
                 .set('x-access-token', pageToken1)
                 .send(recipeBody)
                 .expect(201)
                 .end((err, res) => {
                     expect('Successfully added new recipe').to.equal(res.body.message);
                     if (err) done(err);
                     done();
                 });
         });
         it('should be able to create another recipe when all validations are met', (done) => {
             const recipeBody = { title: 'French Fries', ingredients: 'onions, vegetables, carrots, salt', procedures: 'Boil water for about 20 minutes. Cut carrots into considerable sizes...' };
             request.post('/api/v1/recipes')
                 .set('x-access-token', pageToken1)
                 .send(recipeBody)
                 .expect(201)
                 .end((err, res) => {
                     expect('Successfully added new recipe').to.equal(res.body.message);
                     if (err) done(err);
                     done();
                 });
         });
     });
     describe('Update recipe positive operations', () => {
         it('should be able to update recipe when all validations are met', (done) => {
             const recipeBody = { title: 'African Salad', ingredients: 'onions, vegetables, carrots, salt', procedures: 'Boil water for about 20 minutes. Cut carrots into considerable sizes...' };
             request.put('/api/v1/recipes/1')
                 .set('x-access-token', pageToken1)
                 .send(recipeBody)
                 .expect(201)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Success',
                         message: 'Successfully updated recipe'
                     });
                     if (err) done(err);
                     done();
                 });
         });
     });
     describe('Update recipe negative operations', () => {
         it('should not be able to access the recipes page when security token is undefined(not set)', (done) => {
             const recipeBody = { title: 'title of recipe' };
             request.put('/api/v1/recipes/1')
                 .send(recipeBody)
                 .expect(403)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Access denied. You are not logged in'
                     });
                     if (err) done(err);
                     done();
                 });
         });
         it('should not be able to access the recipes page with a wrong security token', (done) => {
             const recipeBody = { title: 'title of recipe' };
             request.put('/api/v1/recipes/1')
                 .set('x-access-token', wrongToken)
                 .send(recipeBody)
                 .expect(401)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Authentication failed. Token is invalid or expired'
                     });
                     if (err) done(err);
                     done();
                 });
         });
         it('should not be able to update recipe when no field(s) is(are) provided', (done) => {
             request.put('/api/v1/recipes/1')
                 .set('x-access-token', pageToken1)
                 .send()
                 .expect(400)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Provide a field to update'
                     });
                     if (err) done(err);
                     done();
                 });
         });
         it('Should not be able to update recipe when recipe title contains number(s), ingredients characters length is less than 20 and procedures characters length is less than 20', (done) => {
             const recipeBody = { title: 'African 54Salad', ingredients: 'onions', procedures: 'Boil water' };
             request.put('/api/v1/recipes/1')
                 .set('x-access-token', pageToken1)
                 .send(recipeBody)
                 .expect(400)
                 .end((err, res) => {
                     expect('Recipe title must not contain numbers').to.equal(res.body.errors.title);
                     expect('Recipe ingredients provided must be more than 20 characters').to.equal(res.body.errors.ingredients);
                     expect('Recipe procedures provided must be more than 30 characters').to.equal(res.body.errors.procedures);
                     if (err) done(err);
                     done();
                 });
         });
         it('Should be able to login to account created with valid credentials', (done) => {
             const user = { username: 'chyke', password: 'ilovecoding' };
             request.post('/api/v1/users/signin')
                 .set('Content-Type', 'application/json')
                 .send(user)
                 .expect(200)
                 .end((err, res) => {
                     pageToken2 = res.body.token;
                     expect('chyke').to.equal(res.body.data.username);
                     expect('You are now logged In').to.equal(res.body.message);
                     done();
                 });
         });
         it('should not be able to update a recipe a user did not create', (done) => {
             const recipeBody = { title: 'African Salad' };
             request.put('/api/v1/recipes/1')
                 .set('x-access-token', pageToken2)
                 .send(recipeBody)
                 .expect(400)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Can not update a recipe not created by you'
                     });
                     if (err) done(err);
                     done();
                 });
         });
         it('should not be able to update a recipe that is not found', (done) => {
             const recipeBody = { title: 'African Salad' };
             request.put('/api/v1/recipes/45')
                 .set('x-access-token', pageToken2)
                 .send(recipeBody)
                 .expect(404)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Recipe with id: 45, not found'
                     });
                     done();
                 });
         });
     });
 });