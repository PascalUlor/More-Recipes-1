/**
 * API Endpoint Tests for upvoting and downvoting Recipes
 */
import userOneToken, { request, expect } from './1_users.test';
import userTwoToken from './2_recipes.test';


describe('test cases for voting a recipe', () => {
  describe('test cases for voting a recipe postive operations', () => {
    it('should be able to upvote a recipe by user one', (done) => {
      request.post('/api/v1/recipes/4/vote?vote=upvote')
        .set('x-access-token', userOneToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).deep.equal({
            status: 'Success',
            message: 'Thanks for upvoting',
            voteLog: { upvotes: 1, downvotes: 0 },
            userVote: 'upvote'
          });
          if (error) done(error);
          done();
        });
    });
    it('should be able to downvote the same recipe by user one', (done) => {
      request.post('/api/v1/recipes/4/vote?vote=downvote')
        .set('x-access-token', userOneToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).deep.equal({
            status: 'Success',
            message: 'You downvoted',
            voteLog: { upvotes: 0, downvotes: 1 },
            userVote: 'downvote'
          });
          if (error) done(error);
          done();
        });
    });
    it('should be able to downvote a recipe by user two', (done) => {
      request.post('/api/v1/recipes/4/vote?vote=downvote')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).deep.equal({
            status: 'Success',
            message: 'Thanks for downvoting',
            voteLog: { upvotes: 0, downvotes: 2 },
            userVote: 'downvote'
          });
          if (error) done(error);
          done();
        });
    });
    it('should be able to upvote the same recipe by user two', (done) => {
      request.post('/api/v1/recipes/4/vote?vote=upvote')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).deep.equal({
            status: 'Success',
            message: 'You upvoted',
            voteLog: { upvotes: 1, downvotes: 1 },
            userVote: 'upvote'
          });
          if (error) done(error);
          done();
        });
    });
  });
  describe('test cases for voting a recipe negative operations', () => {
    it('should not be able to vote a recipe when recipe id is not a number', (done) => {
      request.post('/api/v1/recipes/yes/vote')
        .set('x-access-token', userOneToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(406);
          expect('Recipe ID must be a number').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
    it('should not be able to vote a recipe if recipe does not exit or has been initially deleted', (done) => {
      request.post('/api/v1/recipes/5/vote')
        .set('x-access-token', userOneToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect('Recipe Not found or has been deleted').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
    it('should not be able to downvote the same recipe more than once by user one', (done) => {
      request.post('/api/v1/recipes/4/vote?vote=downvote')
        .set('x-access-token', userOneToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(409);
          expect('You already downvoted').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
    it('should not be able to upvote the same recipe more than once by user two', (done) => {
      request.post('/api/v1/recipes/4/vote?vote=upvote')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(409);
          expect('You already upvoted').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
  });
});
