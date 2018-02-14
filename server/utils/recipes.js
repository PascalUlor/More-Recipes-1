import requestFeedback from './requestFeedback';
import checkId from './checkId';

const fetchRecipes = (
  request, response, recipesModel, usersModel,
  favoritesModel, userId, orderBy, orderType, message1, message2
) => {
  let recipeQuery = {};
  const { search } = request.query;
  let titles;
  const model = favoritesModel !== null ? favoritesModel : recipesModel;
  if (userId) {
    recipeQuery = { where: { userId } };
  }
  if (search && search.length >= 3) {
    titles = search.split(' ').map(title => ({
      title: {
        $iLike: `%${title.trim()}%`
      }
    }));
    recipeQuery = {
      where: {
        $or: titles
      }
    };
  }

  model.findAndCountAll(recipeQuery).then((allRecipes) => {
    if (allRecipes.count === 0) {
      return requestFeedback.error(response, 404, message1);
    }

    const pageQuery = request.query.page || 1;
    if (checkId.pageNumber(response, pageQuery)) {
      if (pageQuery && pageQuery === '0') {
        return requestFeedback
          .error(response, 400, 'Page query of 0 is invalid');
      }

      let offset = 0;
      const limit = 6,
        currentPage = parseInt(pageQuery, 10),
        numberOfRecipes = allRecipes.count,
        totalPages = Math.ceil(numberOfRecipes / limit);
      offset = limit * (currentPage - 1);
      let query = {
        where: recipeQuery.where,
        include: [{ model: usersModel, attributes: ['fullName'] }],
        limit,
        offset,
        order: [
          [orderBy, orderType]
        ]
      };
      if (userId && favoritesModel !== null) {
        query = {
          where: { userId },
          include: [{
            model: recipesModel,
            attributes: ['id', 'title', 'recipeImage', 'viewsCount', 'userId'],
            include: [{ model: usersModel, attributes: ['fullName'] }]
          }],
          limit,
          offset,
          order: [
            [orderBy, orderType]
          ]
        };
      }
      if (!userId && !search) {
        query = {
          include: [{ model: usersModel, attributes: ['fullName'] }],
          limit,
          offset,
          order: [
            [orderBy, orderType]
          ],
        };
      }

      model.findAll(query).then((recipes) => {
        if (recipes.length === 0) {
          return requestFeedback
            .error(response, 404, 'Requested page is not available');
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
    }
  });
};

export default fetchRecipes;
