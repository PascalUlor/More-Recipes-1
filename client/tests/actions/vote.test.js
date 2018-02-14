/* eslint-disable */
import voteRecipe from '../../actions/actionCreators/voteRecipeActions';
import * as types from '../../actions/actionTypes/actionTypes';
import mockData from '../__mocks__/data/voteData';

describe('vote recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should upvote a user\'s recipe', (done) => {
    const { voteSuccess } = mockData, recipeId = 2, voteType = 'upvote';
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/vote?vote=${voteType}`, {
      status: 201,
      response: voteSuccess
    });

    const expectedActions = [
      { type: types.VOTE_RECIPE_SUCCESS, votes: voteSuccess }
    ];
    const store = mockStore({});
    return store.dispatch(voteRecipe(recipeId, voteType))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should catch an error when voting for a user\'s recipe', (done) => {
    const { voteFailure404 } = mockData, recipeId = 2, voteType = 'upvote';
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/vote?vote=${voteType}`, {
      status: 404,
      response: voteFailure404
    });

    const expectedActions = [
      { type: types.VOTE_RECIPE_FAILURE, error: voteFailure404.message }
    ];
    const store = mockStore({});
    return store.dispatch(voteRecipe(recipeId, voteType))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
