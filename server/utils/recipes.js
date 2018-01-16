const fetchRecipes = (request, response, modelR, modelU, modelF, userId, orderBy, orderType, message1, message2) => {
  let recipeQuery = {};
  const model = modelF !== null ? modelF : modelR;
  if (userId) {
    recipeQuery = { where: { userId } };
  }
  model.findAndCountAll(recipeQuery).then((allRecipes) => {
    if (allRecipes.count === 0) {
      return response.status(404).json({
        status: 'Failed',
        message: message1
      });
    }

    const pageQuery = request.query.page || 1;
    if (pageQuery && pageQuery === '0') {
      return response.status(422).json({
        status: 'Failed',
        message: 'Page query of 0 is invalid'
      });
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
        return response.status(404).json({
          status: 'Failed',
          message: 'Requested page is not available'
        });
      }
      return response.status(200).json({
        status: 'Success',
        message: message2,
        numberOfRecipes,
        limit,
        totalPages,
        currentPage,
        recipes
      });
    });
  });
};

export default fetchRecipes;
