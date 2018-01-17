import models from '../models';
import { createVote, voteResponse } from '../utils/votes';
import requestFeedback from '../utils/requestFeedback';
import checkId from '../utils/checkId';

const { Recipes, Votes } = models;

/**
 * Class Definition for the upvoting or downvoting recipes
 * @class VotesApiController
 */
export default class VotesApiController {
  /**
   * @description Upvoting and downvoting a recipe
   * @memberof VotesApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} failure response messages object or success message object with data persisted to the database
   */
  static votes(request, response) {
    const { userId } = request.decoded, recipeId = parseInt(request.params.recipeID.trim(), 10);

    if (checkId.recipeId(response, recipeId)) {
      return Recipes.findById(recipeId).then((recipe) => {
        if (recipe) {
          return Votes.findOne({ where: { userId, recipeId } }).then((foundVote) => {
            if (foundVote) {
              if (request.query.vote === 'upvote') {
                if (foundVote.vote === 'upvote') {
                  return requestFeedback.error(response, 409, 'You already upvoted');
                }
                return Votes.update({
                  vote: 'upvote'
                }, {
                  where: { userId, recipeId }
                }).then(() => {
                  Recipes.update({
                      upvotes: (recipe.upvotes + 1),
                      downvotes: (recipe.downvotes === 0) ? 0 : (recipe.downvotes - 1)
                    }, { where: { id: recipeId } })
                    .then(() => (voteResponse(Recipes, recipeId, response, 'You upvoted')));
                });
              }
              if (foundVote.vote === 'downvote') {
                return requestFeedback.error(response, 409, 'You already downvoted');
              }
              return Votes.update({
                vote: 'downvote'
              }, {
                where: { userId, recipeId }
              }).then(() => {
                Recipes.update({
                    upvotes: (recipe.upvotes === 0) ? 0 : (recipe.upvotes - 1),
                    downvotes: (recipe.downvotes + 1)
                  }, { where: { id: recipeId } })
                  .then(() => (voteResponse(Recipes, recipeId, response, 'You downvoted')));
              });
            }
            if (request.query.vote === 'upvote') {
              return createVote(Recipes, Votes, response, userId, recipeId, 'upvote', recipe, 'Thanks for upvoting');
            }
            return createVote(Recipes, Votes, response, userId, recipeId, 'downvote', recipe, 'Thanks for downvoting');
          });
        }
        return requestFeedback.error(response, 404, 'Recipe Not found or has been deleted');
      }).catch(error => (requestFeedback.error(response, 500, error.message)));
    }
  }
}
