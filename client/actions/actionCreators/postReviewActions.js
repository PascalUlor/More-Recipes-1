import axios from 'axios';
import {
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAILURE
} from '../actionTypes/actionTypes';

/**
 * @description handles post review success
 *
 * @param { object } review - contains object of recipe review
 * @param { string } message - contains string of posted review success
 *
 * @returns { object } review success - returns post review success action
 */
const postReviewSuccess = (review, message) => ({
  type: POST_REVIEW_SUCCESS,
  review,
  message
});

/**
 * @description handles post review failure
 *
 * @param { string } error - contains string of posted review failure
 *
 * @returns { object } review error - returns post review failure action
 */
const postReviewFailure = error => ({
  type: POST_REVIEW_FAILURE,
  error
});

/**
 * @description handles post review success
 *
 * @param { string } review - contains string of recipe review body
 * @param { string } recipeId - contains ID of recipe been reviewed
 *
 * @returns { object } review - returns post review action
 */
const postReviewRequest = (review, recipeId) => (
  dispatch => (
    axios({
      method: 'POST',
      headers: {
        'x-access-token': window.localStorage.jwtToken
      },
      url: `/api/v1/recipes/${recipeId}/reviews`,
      data: {
        reviewBody: review
      }
    }).then((response) => {
      const { postedReview, message } = response.data;
      dispatch(postReviewSuccess(postedReview, message));
    }).catch((error) => {
      dispatch(postReviewFailure(error.response.data.message));
    })
  )
);

export default postReviewRequest;
