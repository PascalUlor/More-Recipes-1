import { POST_REVIEW_SUCCESS_MESSAGE, POST_REVIEW_FAILURE_MESSAGE } from '../actions/actionTypes/actionTypes';

const initialState = {
  postReviewMessage: '',
  postReviewError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case POST_REVIEW_SUCCESS_MESSAGE:
      return Object.assign({}, state, { postReviewMessage: action.message });
    case POST_REVIEW_FAILURE_MESSAGE:
      return Object.assign({}, state, { postReviewError: action.error });
    default:
      return state;
  }
};
