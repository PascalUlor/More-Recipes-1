/* eslint-disable */
import postReview from '../../actions/actionCreators/postReviewActions';
import * as types from '../../actions/actionTypes/actionTypes';
import mockData from '../__mocks__/data/reviewData';

describe('review actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const recipeId = 1,
    { reviewBody, postResponse } = mockData;
  it('should post a review for a recipe', (done) => {
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/reviews`, {
      status: 201,
      response: postResponse
    });
    const { postedReview, message } = postResponse;
    const expectedActions = [{
      type: types.POST_REVIEW_SUCCESS,
      review: postedReview,
      message
    }];

    const store = mockStore({});
    return store.dispatch(postReview(reviewBody, recipeId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should catch an error when posting a review for a recipe', (done) => {
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/reviews`, {
      status: 404,
      response: { message: mockData.postError }
    });

    const expectedActions = [
      { type: types.POST_REVIEW_FAILURE, error: mockData.postError }
    ];
    const store = mockStore({});
    return store.dispatch(postReview(reviewBody, recipeId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
