import models from '../models';
import { createVote, voteResponse } from '../utils/votes';

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

    if (Number.isNaN(recipeId)) {
      return response.status(406).json({
        status: 'Failed',
        message: 'Recipe ID must be a number'
      });
    }
    return Recipes.findById(recipeId).then((recipe) => {
      if (recipe) {
        return Votes.findOne({ where: { userId, recipeId } }).then((foundVote) => {
          if (foundVote) {
            if (request.query.vote === 'upvote') {
              if (foundVote.vote === 'upvote') {
                return response.status(409).json({
                  status: 'Failed',
                  message: 'You already upvoted'
                });
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
              return response.status(409).json({
                status: 'Failded',
                message: 'You already downvoted'
              });
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
      return response.status(404).json({
        status: 'Failed',
        message: 'Recipe Not found or may have been deleted'
      });
    }).catch(error => (
      response.status(500).json({
        status: 'Failed',
        message: error.message
      })
    ));
  }
}
