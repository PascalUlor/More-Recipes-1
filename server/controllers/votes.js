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
      Recipe.findById(recipeId).then((recipe) => {
        if (recipe) {
          return Vote.findOne({ where: { userId, recipeId } })
            .then((foundVote) => {
              if (foundVote) {
                if (vote === 'upvote') {
                  if (foundVote.vote === 'upvote') {
                    return requestFeedback
                      .error(response, 409, 'You already upvoted');
                  }
                  return Vote.update({
                    vote: 'upvote'
                  }, {
                    where: { userId, recipeId }
                  }).then(() => {
                    Recipe
                      .update({
                        upvotes: recipe.upvotes + 1,
                        downvotes: recipe.downvotes - 1
                      }, { where: { id: recipeId } })
                      .then(() => (voteResponse(
                        Recipe, recipeId, response,
                        200, 'You upvoted', vote
                      )));
                  });
                }
                if (foundVote.vote === 'downvote') {
                  return requestFeedback.error(
                    response, 409,
                    'You already downvoted'
                  );
                }
                return Vote.update({
                  vote: 'downvote'
                }, {
                  where: { userId, recipeId }
                }).then(() => {
                  Recipe
                    .update({
                      upvotes: recipe.upvotes - 1,
                      downvotes: recipe.downvotes + 1
                    }, { where: { id: recipeId } })
                    .then(() => (voteResponse(
                      Recipe, recipeId,
                      response, 200, 'You downvoted', vote
                    )));
                });
              }

              if (vote === 'upvote') {
                return createVote(
                  Recipe, Vote, response, userId, recipeId,
                  vote, recipe, 201, 'Thanks for upvoting'
                );
              }
              return createVote(
                Recipe, Vote, response, userId, recipeId,
                vote, recipe, 201, 'Thanks for downvoting'
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
