import axios from 'axios';
import { POST_REVIEW_SUCCESS, POST_REVIEW_SUCCESS_MESSAGE, POST_REVIEW_FAILURE_MESSAGE } from '../actionTypes/actionTypes';


const postReviewSuccess = review => ({
  type: POST_REVIEW_SUCCESS,
  review
});

const PostReviewSuccessMessage = message => ({
  type: POST_REVIEW_SUCCESS_MESSAGE,
  message
});

const postReviewFailure = error => ({
  type: POST_REVIEW_FAILURE_MESSAGE,
  error
});

const postReviewRequest = (review, recipeId, callback) => (
  (dispatch) => {
    axios({
        method: 'POST',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: `/api/v1/recipes/${recipeId}/reviews`,
        data: {
          reviewBody: review
        }
      })
      .then((response) => {
        dispatch(PostReviewSuccessMessage(response.data.message));
        dispatch(postReviewSuccess(response.data.postedReview));
        callback();
      })
      .catch((error) => {
        dispatch(postReviewFailure(error.response.data.message));
        callback();
      });
  }
);

export default postReviewRequest;
