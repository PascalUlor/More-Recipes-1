import models from '../models';
import { createVote, voteResponse } from '../utils/votes';
import requestFeedback from '../utils/requestFeedback';
import checkId from '../utils/checkId';

const { Recipe, Vote } = models;

/**
 * Class Definition for the upvoting or downvoting recipes
 * @class VotesApiController
 */
export default class VotesApiController {
  /**
   * @description Upvoting and downvoting a recipe
   * @memberof VoteApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} failure response messages object or
   * success message object with data persisted to the database
   */
  static votes(request, response) {
    const recipeId = parseInt(request.params.recipeID.trim(), 10),
      { userId } = request.decoded,
      { vote } = request.query;

    if (checkId.recipeId(response, recipeId)) {
      return Recipe.findById(recipeId).then((recipe) => {
        if (recipe) {
          return Vote.findOne({ where: { userId, recipeId } })
            .then((foundVote) => {
              if (foundVote) {
                if (foundVote.vote === vote) {
                  return requestFeedback
                    .error(response, 409, `You already ${vote}d`);
                }
                return Vote.update({
                  vote
                }, {
                  where: { userId, recipeId }
                }).then(() => {
                  const { upvotes, downvotes } = recipe;
                  return Recipe.update({
                    upvotes: vote === 'upvote' ? upvotes + 1 : upvotes - 1,
                    downvotes: vote === 'downvote'
                      ? downvotes + 1 : downvotes - 1
                  }, { where: { id: recipeId } })
                    .then(() => (voteResponse(
                      Recipe, recipeId, response,
                      200, `You ${vote}d`, vote
                    )));
                });
              }
              let message = 'Thanks for upvoting';
              if (vote === 'downvote') {
                message = 'Thanks for downvoting';
              }
              return createVote(
                Recipe, Vote, response, userId,
                recipeId, vote, 201, message
              );
            });
        }
        return requestFeedback.error(
          response, 404,
          'Recipe Not found or has been deleted'
        );
      }).catch(error => (requestFeedback.error(response, 500, error.message)));
    }
  }
}
