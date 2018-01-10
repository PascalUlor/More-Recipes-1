export const voteResponse = (modelR, recipeId, response, message) => (
  modelR.findById(recipeId).then((recipe) => {
    const { upvotes, downvotes } = recipe;
    response.status(200).json({
      status: 'Success',
      message,
      voteLog: { upvotes, downvotes }
    });
  }).catch(error => (
    response.status(404).json({
      status: 'Failed',
      message: error.message
    })
  ))
);

export const createVote = (modelR, modelV, response, userId, recipeId, userVote, initialFoundRecipe, message) => (
  modelV.create({ userId, recipeId, vote: userVote }).then(() => {
    initialFoundRecipe.increment(userVote.concat('s'));
  }).then(() => (voteResponse(modelR, recipeId, response, message)))
);
