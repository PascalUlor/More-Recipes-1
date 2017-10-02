 /**
  * API Endpoint Tests for dummy data
  */
 import supertest from 'supertest';
 import chai from 'chai';
 import app from '../app';

 const { expect } = chai,
 request = supertest(app);

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
             request.get('*')
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

         });
     });
 });