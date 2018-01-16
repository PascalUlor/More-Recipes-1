const checkId = {
  userId(response, modelU, userId) {
    modelU.findById(userId).then((userFound) => {
      if (!userFound) {
        return response.status(404).json({
          status: 'Failed',
          message: 'User not found or has been deleted'
        });
      }
    });
  },
  recipeId(response, recipeId) {
    if (Number.isNaN(recipeId)) {
      response.status(406).json({
        status: 'Failed',
        message: 'Recipe ID must be a number'
      });
      return 0;
    }
    return 1;
  }
};

export default checkId;
