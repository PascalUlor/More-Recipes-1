const data = {
  addSuccess: {
    status: 'Success',
    message: 'Recipe has been favorited',
    favoritedRecipe: {
      id: 1,
      userId: 2,
      recipeId: 2,
      updatedAt: '2018-02-05T19:13:06.177Z',
      createdAt: '2018-02-05T19:13:06.177Z'
    }
  },
  addError404: {
    message: 'Recipe not found or has been deleted'
  },
  addError403: 'Can not favorite a recipe created by you',
  getSuccess: {
    status: 'Success',
    message: 'Successfully retrieved your favorite Recipe(s)',
    numberOfRecipes: 1,
    limit: 6,
    totalPages: 1,
    currentPage: 1,
    recipes: [{
      id: 1,
      userId: 2,
      recipeId: 2,
      createdAt: '2018-02-05T19:13:06.177Z',
      updatedAt: '2018-02-05T19:13:06.177Z',
      Recipe: {
        id: 2,
        title: 'Meat Pie',
        recipeImage: 'recipeTwo.jpg',
        viewsCount: 0,
        userId: 1,
        User: {
          fullName: 'John Doe'
        }
      }
    }]
  },
  getError: {
    message: 'You have no favorited recipes'
  },
  deleteSuccess: {
    status: 'Success',
    message: 'Successfully deleted Recipe'
  },
  deleteError404: {
    message: 'Recipe not found or has been deleted'
  }
};

export default data;
