import axios from 'axios';
import {
  VOTE_RECIPE_SUCCESS,
  VOTE_RECIPE_FAILURE
}
from '../actionTypes/actionTypes';

const voteRecipeSuccess = votes => ({
  type: VOTE_RECIPE_SUCCESS,
  votes
});

const voteRecipeFailure = error => ({
  type: VOTE_RECIPE_FAILURE,
  error
});

const voteRecipeRequest = (recipeId, voteType) => (
  dispatch => (
    axios({
      method: 'POST',
      headers: {
        'x-access-token': window.localStorage.jwtToken
      },
      url: `/api/v1/recipes/${recipeId}/vote?vote=${voteType}`
    })
    .then((response) => {
      dispatch(voteRecipeSuccess(response.data));
    }).catch((error) => {
      dispatch(voteRecipeFailure(error.response.data.message));
    })
  )
);

export default voteRecipeRequest;
