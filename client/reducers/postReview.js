import {
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAILURE
} from '../actions/actionTypes/actionTypes';

const initialState = {
  postReviewMessage: '',
  postReviewError: ''
};
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
