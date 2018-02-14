import postReview from '../../reducers/postReview';
import * as types from '../../actions/actionTypes/actionTypes';

describe('Post Review Reducer', () => {
  const initialState = {
    postReviewMessage: '',
    postReviewError: ''
  };

  it('should return proper initial state', (done) => {
    expect(postReview(undefined, {})).toEqual(initialState);
    done();
  });

  it(
    'should set post review success messsage when passed POST_REVIEW_SUCCESS',
    (done) => {
      const message = 'Successfully posted review';

      const action = {
        type: types.POST_REVIEW_SUCCESS,
        message
      };

      const newState = postReview(initialState, action);
      expect(newState.postReviewMessage).toEqual(message);
      expect(newState.postReviewError).toEqual('');
      done();
    }
  );
  it(
    'should set post review error messsage when passed POST_REVIEW_FAILURE',
    (done) => {
      const error = 'Error in posting your review';

      const action = {
        type: types.POST_REVIEW_FAILURE,
        error
      };

      const newState = postReview(initialState, action);
      expect(newState.postReviewMessage).toEqual('');
      expect(newState.postReviewError).toEqual(error);
      done();
    }
  );
});
