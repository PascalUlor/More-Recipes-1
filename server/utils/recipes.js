import requestFeedback from './requestFeedback';

const fetchRecipes = (request, response, modelR, modelU, modelF, userId, orderBy, orderType, message1, message2) => {
  let recipeQuery = {};
  const model = modelF !== null ? modelF : modelR;
  if (userId) {
    recipeQuery = { where: { userId } };
  }
  model.findAndCountAll(recipeQuery).then((allRecipes) => {
    if (allRecipes.count === 0) {
      return requestFeedback.error(response, 404, message1);
    }

    const pageQuery = request.query.page || 1;
    if (pageQuery && pageQuery === '0') {
      return requestFeedback.error(response, 422, 'Page query of 0 is invalid');
    }

    let offset = 0;
    const limit = 6,
      currentPage = parseInt(pageQuery, 10),
      numberOfRecipes = allRecipes.count,
      totalPages = Math.ceil(numberOfRecipes / limit);
    offset = limit * (currentPage - 1);
    let query = {
      where: { userId },
      limit,
      offset,
      order: [
        [orderBy, orderType]
      ]
    };
    if (userId && modelF !== null) {
      query = {
        where: { userId },
        include: [{
          model: modelR,
          attributes: ['id', 'title', 'recipeImage', 'viewsCount', 'userId'],
          include: [{ model: modelU, attributes: ['fullName'] }]
        }],
        limit,
        offset,
        order: [
          [orderBy, orderType]
        ]
      };
    }
    if (!userId) {
      query = {
        include: [{ model: modelU, attributes: ['fullName'] }],
        limit,
        offset,
        order: [
          [orderBy, orderType]
        ],
      };
    }

    model.findAll(query).then((recipes) => {
      if (recipes.length === 0) {
        return requestFeedback.error(response, 404, 'Requested page is not available');
      }

      const payload = {
        numberOfRecipes,
        limit,
        totalPages,
        currentPage,
        recipes
      };
      return requestFeedback.success(response, 200, message2, payload);
    });
  });
};

export default fetchRecipes;
