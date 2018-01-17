import requestFeedback from './requestFeedback';


const checkId = {
  userId(response, modelU, userId) {
    modelU.findById(userId).then((userFound) => {
      if (!userFound) {
        return requestFeedback.error(response, 404, 'User not found or has been deleted');
      }
    });
  },
  recipeId(response, recipeId) {
    if (Number.isNaN(recipeId)) {
      requestFeedback.error(response, 406, 'Recipe ID must be a number');
      return 0;
    }
    return 1;
  }
};

export default checkId;
