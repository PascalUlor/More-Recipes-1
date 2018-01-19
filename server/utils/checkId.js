import requestFeedback from './requestFeedback';


const checkId = {
  recipeId(response, recipeId) {
    if (Number.isNaN(recipeId)) {
      requestFeedback.error(response, 406, 'Recipe ID must be a number');
      return 0;
    }
    return 1;
  },
  pageNumber(response, pageNumber) {
    if (Number.isNaN(parseInt(pageNumber, 10))) {
      requestFeedback.error(response, 406, 'Page query must be a number');
      return 0;
    }
    return 1;
  }
};

export default checkId;
