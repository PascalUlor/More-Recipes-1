import requestFeedback from './requestFeedback';

export const voteResponse = (modelR, recipeId, response, statusCode, message) => (
  modelR.findById(recipeId).then((recipe) => {
    const { upvotes, downvotes } = recipe;
    requestFeedback.success(response, statusCode, message, { voteLog: { upvotes, downvotes } });
  }).catch(error => (
    requestFeedback.error(response, 404, error.message)
  ))
);

export const createVote = (modelR, modelV, response, userId, recipeId, userVote, initialFoundRecipe, statusCode, message) => (
  modelV.create({ userId, recipeId, vote: userVote }).then(() => {
    initialFoundRecipe.increment(userVote.concat('s'));
  }).then(() => (voteResponse(modelR, recipeId, response, statusCode, message)))
);
