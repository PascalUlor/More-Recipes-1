/**
 * API Endpoint Tests for Favoriting, Unfavoriting and retrieving favorite Recipes
 */
import userOneToken, { request, expect } from './1_users.test';
import userTwoToken from './2_recipes.test';


describe('test cases for favorite recipes route', () => {
  describe('test cases for favoriting a recipe postive operations', () => {
    it('should be able to favorite a recipe user one created, by user two ', (done) => {
      request.post('/api/v1/recipes/3/favorites')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect('Recipe has been favorited').to.equal(response.body.message);
          expect(3).to.equal(response.body.favoritedRecipe.recipeId);
          if (error) done(error);
          done();
        });
    });
    it('should be able to unfavorite a recipe user one created, by user two ', (done) => {
      request.post('/api/v1/recipes/3/favorites')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect('Recipe has been unfavorited').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
  });
  describe('test cases for favoriting a recipe negative operations', () => {
    it('should not be able to favorite a recipe that does not exit or has been initially deleted', (done) => {
      request.post('/api/v1/recipes/5/favorites')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect('Recipe not found or has been deleted').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
    it('should be able to unfavorite a recipe user one created, by user two ', (done) => {
      request.post('/api/v1/recipes/3/favorites')
        .set('x-access-token', userOneToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect('Can not favorite a recipe created by you').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
  });
  describe('test cases for retrieving a user\'s favorite recipes', () => {
    it('should be able to favorite a recipe user one created, by user two ', (done) => {
      request.post('/api/v1/recipes/3/favorites')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect('Recipe has been favorited').to.equal(response.body.message);
          expect(3).to.equal(response.body.favoritedRecipe.recipeId);
          if (error) done(error);
          done();
        });
    });
    it('should be able to retrieve a user\'s favorite recipes', (done) => {
      request.get('/api/v1/user/favorites')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect('Successfully retrieved your favorite Recipe(s)').to.equal(response.body.message);
          expect(1).to.equal(response.body.numberOfRecipes);
          expect(1).to.equal(response.body.totalPages);
          expect(1).to.equal(response.body.recipes.length);
          if (error) done(error);
          done();
        });
    });
    it('should not be able to retrieve a user\'s favorite recipes, when they have none', (done) => {
      request.get('/api/v1/user/favorites')
        .set('x-access-token', userOneToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect('You have no favorited recipes').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
  });
  describe('test cases for deleting a favorited recipe', () => {
    it('should be able to favorite a recipe user one created, by user two ', (done) => {
      request.delete('/api/v1/user/favorites/3')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect('Successfully deleted Recipe').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
    it('should be able to retrieve a user\'s favorite recipes', (done) => {
      request.delete('/api/v1/user/favorites/3')
        .set('x-access-token', userTwoToken.token)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body).deep.equal({
            status: 'Failed',
            message: 'Recipe not found or has been deleted'
          });
          if (error) done(error);
          done();
        });
    });
  });
});
