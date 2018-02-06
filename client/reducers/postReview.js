import {
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAILURE
} from '../actions/actionTypes/actionTypes';

const initialState = {
  postReviewMessage: '',
  postReviewError: ''
};

/**
 * @description holds success and failure states for posting a review for a
 * user recipe
 * deleting user favourite recipes
 * @function
 *
 * @param { object } state - contains reducer initial state
 * @param { object } action - contains actions to be performed
 *
 * @returns { object } the posted review state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case POST_REVIEW_SUCCESS:
      return Object.assign({}, state, { postReviewMessage: action.message });
    case POST_REVIEW_FAILURE:
      return Object.assign({}, state, { postReviewError: action.error });
    default:
      return state;
  }
};
