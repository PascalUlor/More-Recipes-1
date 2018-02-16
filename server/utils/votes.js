import requestFeedback from './requestFeedback';

export const voteResponse = (
  recipeModel, recipeId, response,
  statusCode, message, userVote
) => (
  recipeModel.findById(recipeId).then((recipe) => {
    const { upvotes, downvotes } = recipe;
    requestFeedback.success(
      response,
      statusCode, message, { voteLog: { upvotes, downvotes }, userVote }
    );
  }).catch(error => (
    requestFeedback.error(response, 404, error.message)
  ))
);

export const createVote = (
  recipeModel, voteModel, response, userId, recipeId,
  userVote, statusCode, message
) => {
  const vote = `${userVote}s`;
  return voteModel.create({ userId, recipeId, vote: userVote }).then(() => {
    recipeModel.increment(vote, { where: { id: recipeId } })
      .then(() => (voteResponse(
        recipeModel, recipeId,
        response, statusCode, message, userVote
      )));
  });
};
