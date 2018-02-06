/**
 * API Endpoint Tests for unknown route requests
 */
import userTwoToken, { request, expect } from './1_users.test';

describe('test cases for favorite recipes route', () => {
  it('should be able to favorite a recipe user one created, by user two ', (done) => {
    request.post('/api/v1/invalid/route')
      .set('x-access-token', userTwoToken.token)
      .end((error, response) => {
        expect(response.body).deep.equal({
          status: 'Failed',
          message: 'Page not found'
        });
        if (error) done(error);
        done();
      });
  });
});
