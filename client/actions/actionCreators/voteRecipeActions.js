import axios from 'axios';
import {
  VOTE_RECIPE_SUCCESS,
  VOTE_RECIPE_FAILURE
} from '../actionTypes/actionTypes';

/**
 * @description handles vote recipe success
 *
 * @param { object } votes - contains object of number of upvotes and downvotes
 *
 * @returns { object } vote success - returns vote recipe success action
 */
const voteRecipeSuccess = votes => ({
  type: VOTE_RECIPE_SUCCESS,
  votes
});

/**
 * @description handles vote recipe failure
 *
 * @param { string } error - contains string of vote recipe failure
 *
 * @returns { object } vote failure - returns vote recipe failure action
 */
const voteRecipeFailure = error => ({
  type: VOTE_RECIPE_FAILURE,
  error
});

/**
 * @description handles vote recipe requests
 *
 * @param { number } recipeId - contains recipe ID number been voted
 * @param { string } voteType - contains either upvote or downvote
 *
 * @returns { object } vote success - returns vote recipe request action
 */
const voteRecipeRequest = (recipeId, voteType) => (
  dispatch => (
    axios({
      method: 'POST',
      headers: {
        'x-access-token': window.localStorage.jwtToken
      },
      url: `/api/v1/recipes/${recipeId}/vote?vote=${voteType}`
    }).then((response) => {
      dispatch(voteRecipeSuccess(response.data));
    }).catch((error) => {
      dispatch(voteRecipeFailure(error.response.data.message));
    })
  )
);

export default voteRecipeRequest;
