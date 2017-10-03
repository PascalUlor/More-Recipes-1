 /**
  * API Endpoint Tests for dummy data
  */
 import supertest from 'supertest';
 import chai from 'chai';
 import app from '../app';

 const { expect } = chai,
 request = supertest(app),
     invalidRecipeID = 5;

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

     describe('All test cases for adding a recipe', () => {
         describe('All negative test cases for adding a recipe', () => {
             it('should return `400` status code with res.body error messages', (done) => {
                 request.post('/api/v1/recipes')
                     .set('Content-Type', 'application/json')
                     .send({}) // no defined request body
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

             it('should return `400` status code with `res.body.errors` messages', (done) => {
                 request.post('/api/v1/recipes')
                     .set('Content-Type', 'application/json')
                     .send({
                         title: '',
                         ingredients: '',
                         description: ''
                     }) // empty body request
                     .expect(400)
                     .end((err, res) => {
                         expect('Title of recipe is required').to.equal(res.body.errors.title);
                         expect('Recipe ingredients are required').to.equal(res.body.errors.ingredients);
                         expect('Description for your recipe are required').to.equal(res.body.errors.description);
                         if (err) done(err);
                         done();
                     });
             });

             it('should return `400` status code with `res.body.error` messages', (done) => {
                 request.post('/api/v1/recipes')
                     .set('Content-Type', 'application/json')
                     .send({
                         title: '24_African Salad',
                         ingredients: 'Salt, pepper',
                         description: 'Boil water'
                     })
                     .expect(400)
                     .end((err, res) => {
                         expect('Title should not start with number(s)').to.equal(res.body.errors.title);
                         expect('Ingredients provided must be more than 15 characters').to.equal(res.body.errors.ingredients);
                         expect('Description provided must be more than 20 characters').to.equal(res.body.errors.description);
                         if (err) done(err);
                         done();
                     });
             });
         });

         describe('Positive test case for adding a recipe', () => {
             it('should return `200` status code with `res.body.error` messages', (done) => {
                 request.post('/api/v1/recipes')
                     .set('Content-Type', 'application/json')
                     .send({
                         title: 'African Salad',
                         ingredients: 'onion, tomatoes, bread, icecream',
                         description: 'Boil enough nnsgsn shhsgsn dn d hdmd'
                     })
                     .expect(201)
                     .end((err, res) => {
                         expect('Success').to.equal(res.body.status);
                         expect('Successfully added new recipe').to.equal(res.body.message);
                         expect(res.body.recipesData[3]).to.have.property('title');
                         done();
                     });
             });
         });
     });

     describe('All test cases for updating a recipe', () => {
         describe('All negative test cases for updating a recipe', () => {
             it('should return `400` status code with `res.body` error messages', (done) => {
                 request.put(`/api/v1/recipes/${invalidRecipeID}`)
                     .set('Content-Type', 'application/json')
                     .send({
                         title: 'African Salad',
                         ingredients: 'onion, tomatoes, bread, icecream',
                         description: 'Boil enough nnsgsn shhsgsn dn d hdmd'
                     })
                     .expect(400)
                     .end((err, res) => {
                         expect(res.body).deep.equal({
                             status: 'Failed',
                             message: 'Recipe ID parameter does not exist'
                         });
                         if (err) done(err);
                         done();
                     });
             });

             it('should return `400` status code with `res.body` error messages', (done) => {
                 request.put('/api/v1/recipes/3')
                     .set('Content-Type', 'application/json')
                     .send({
                         title: '',
                         ingredients: '',
                         description: ''
                     })
                     .expect(400)
                     .end((err, res) => {
                         expect(res.body).deep.equal({
                             status: 'Failed',
                             message: 'Specify data to update'
                         });
                         if (err) done(err);
                         done();
                     });
             });
         });

         describe('Positive test case for updating a recipe', () => {
             it('should return `200` status code with `res.body` success messages', (done) => {
                 request.put('/api/v1/recipes/3')
                     .set('Content-Type', 'application/json')
                     .send({
                         title: 'African Delicious Salad',
                         ingredients: 'onion, tomatoes, vegetables, pepper'
                     })
                     .expect(200)
                     .end((err, res) => {
                         expect('Success').to.equal(res.body.status);
                         expect('Successfully updated recipe').to.equal(res.body.message);
                         expect(res.body.recipesData[2].title).to.equal('African Delicious Salad');
                         if (err) done(err);
                         done();
                     });
             });
         });
     });

     describe('All postive and negative test cases for deleting a recipe', () => {
         it('should return `400` status code with `res.body` error messages', (done) => {
             request.delete(`/api/v1/recipes/${invalidRecipeID}`)
                 .set('Content-Type', 'application/json')
                 .expect(400)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Recipe ID parameter does not exist'
                     });
                     if (err) done(err);
                     done();
                 });
         });

         it('should return `200` status code with `res.body` success messages', (done) => {
             request.delete('/api/v1/recipes/3')
                 .set('Content-Type', 'application/json')
                 .expect(200)
                 .end((err, res) => {
                     expect('Success').to.equal(res.body.status);
                     expect('Successfully deleted recipe').to.equal(res.body.message);
                     if (err) done(err);
                     done();
                 });
         });
     });

     describe('Positive test case for getting or retriving all recipes without sort query', () => {
         it('should return `200` status code with `res.body` success messages', (done) => {
             request.get('/api/v1/recipes')
                 .set('Content-Type', 'application/json')
                 .expect(200)
                 .end((err, res) => {
                     expect('Success').to.equal(res.body.status);
                     expect('Successfully retrieved all available recipes').to.equal(res.body.message);
                     expect(res.body.recipesData.length).to.equal(4);
                     if (err) done(err);
                     done();
                 });
         });
     });

     describe('All positive and negative test cases for adding or posting a recipe review', () => {
         it('should return `400` status code with `res.body` error messages', (done) => {
             request.post(`/api/v1/recipes/${invalidRecipeID}/reviews`)
                 .set('Content-Type', 'application/json')
                 .send({
                     reviewSubject: 'I think you did not put that special ingredient',
                     vote: 'downvote'
                 })
                 .expect(400)
                 .end((err, res) => {
                     expect(res.body).deep.equal({
                         status: 'Failed',
                         message: 'Recipe ID parameter does not exist'
                     });
                     if (err) done(err);
                     done();
                 });
         });

         it('should return `200` status code with `res.body` success messages', (done) => {
             request.post('/api/v1/recipes/1/reviews')
                 .set('Content-Type', 'application/json')
                 .send({
                     reviewSubject: 'I think you did not put that special ingredient',
                     vote: 'downvote'
                 })
                 .expect(201)
                 .end((err, res) => {
                     expect('Success').to.equal(res.body.status);
                     expect('Successfully added review').to.equal(res.body.message);
                     expect(res.body.reviewsData.length).to.equal(3);
                     if (err) done(err);
                     done();
                 });
         });
     });

     describe('All test cases for getting or retriving all recipes based on most upvotes', () => {
         describe('All negative test cases for getting all recipes based on most upvotes', () => {
             it('should return `400` status code with res.body error messages', (done) => {
                 request.get('/api/v1/recipes?') // no defined request query
                     .set('Content-Type', 'application/json')
                     .expect(400)
                     .end((err, res) => {
                         expect(res.body).deep.equal({
                             status: 'Failed',
                             message: 'Sort or(and) order query parameter(s) is(are) not defined'
                         });
                         if (err) done(err);
                         done();
                     });
             });

             it('should return `400` status code with `res.body.errors` messages', (done) => {
                 request.get('/api/v1/recipes?sort=&order=') // empty request query
                     .set('Content-Type', 'application/json')
                     .expect(400)
                     .end((err, res) => {
                         expect('Sort query is required').to.equal(res.body.errors.sortType);
                         expect('Order query is required').to.equal(res.body.errors.order);
                         if (err) done(err);
                         done();
                     });
             });

             it('should return `400` status code with `res.body.errors` messages', (done) => {
                 request.get('/api/v1/recipes?sort=upvote&order=descending')
                     .set('Content-Type', 'application/json')
                     .expect(400)
                     .end((err, res) => {
                         expect('Sort query must be either upvotes or downvotes').to.equal(res.body.errors.sortType);
                         expect('Order query must be either asc or des').to.equal(res.body.errors.order);
                         if (err) done(err);
                         done();
                     });
             });
         });

         describe('Positive test case for getting all recipes based on most upvotes', () => {
             it('should return `200` status code with `res.body` success messages', (done) => {
                 request.get('/api/v1/recipes?sort=upvotes&order=des')
                     .set('Content-Type', 'application/json')
                     .expect(200)
                     .end((err, res) => {
                         expect('Success').to.equal(res.body.status);
                         expect('Successfully retrieved all available sorted recipes').to.equal(res.body.message);
                         if (err) done(err);
                         done();
                     });
             });
         });
     });
 });