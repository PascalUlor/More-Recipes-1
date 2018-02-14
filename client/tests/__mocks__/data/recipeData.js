const data = {
  createData: {
    title: 'Sweet Cake Cup',
    ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.',
    procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga.',
    imageFile: '',
  },
  createResponse: {
    status: 'Success',
    message: 'Successfully added new recipe',
    recipe: {
      viewsCount: 0,
      upvotes: 0,
      downvotes: 0,
      hasOwnerViewed: false,
      id: 1,
      title: 'Sweet Cake Cup',
      ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.',
      procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga.',
      recipeImage: 'recipeOne.jpg',
      userId: 1,
      updatedAt: '2018-02-05T17:30:32.619Z',
      createdAt: '2018-02-05T17:30:32.619Z'
    }
  },
  doubleTitleResponse: {
    message: 'Recipe with title: Sweet Cake Cup,' +
      'already exist in your catalog'
  },
  updateData: {
    title: 'Bitter Cake Cup',
    ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.more ingredients',
    procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga. added more procedures',
    imageFile: '',
    id: 1
  },
  updateResponse: {
    status: 'Success',
    message: 'Successfully updated recipe',
    recipe: {
      id: 1,
      title: 'Bitter Cake Cup',
      ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.more ingredients',
      procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga. added more procedures',
      recipeImage: 'recipeOne.jpg',
      viewsCount: 1,
      upvotes: 0,
      downvotes: 0,
      hasOwnerViewed: true,
      userId: 1,
      createdAt: '2018-02-05T17:30:32.619Z',
      updatedAt: '2018-02-05T18:29:48.363Z'
    }
  },
  updateError: {
    message: 'Can not update a recipe not created by you'
  },
  deleteRecipeResponse: {
    status: 'Success',
    message: 'Successfully delected recipe',
    recipe: {
      id: 1,
      title: 'Bitter Cake Cup',
      ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.more ingredients',
      procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga. added more procedures',
      recipeImage: 'recipeOne.jpg',
      viewsCount: 1,
      upvotes: 0,
      downvotes: 0,
      hasOwnerViewed: true,
      userId: 1,
      createdAt: '2018-02-05T17:30:32.619Z',
      updatedAt: '2018-02-05T18:29:48.363Z'
    }
  },
  deleteRecipeError: {
    message: 'You can not delete a recipe not created by you'
  },
  allRecipesSuccess: {
    status: 'Success',
    message: 'Successfully retrieved your recipe(s)',
    numberOfRecipes: 2,
    limit: 6,
    totalPages: 1,
    currentPage: 1,
    recipes: [{
      id: 2,
      title: 'Meat Pie',
      ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.',
      procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga.',
      recipeImage: 'recipeTwo.jpg',
      viewsCount: 0,
      upvotes: 0,
      downvotes: 0,
      hasOwnerViewed: false,
      userId: 1,
      createdAt: '2018-02-05T18:12:02.955Z',
      updatedAt: '2018-02-05T18:12:02.955Z'
    },
    {
      id: 1,
      title: 'Sweet Cake Cup',
      ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.',
      procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga.',
      recipeImage: 'recipeOne.jpg',
      viewsCount: 1,
      upvotes: 0,
      downvotes: 0,
      hasOwnerViewed: true,
      userId: 1,
      createdAt: '2018-02-05T17:30:32.619Z',
      updatedAt: '2018-02-05T17:59:27.533Z'
    }
    ]
  },
  allRecipesResponse: {
    status: 'Success',
    message: 'Successfully retrieved your recipe(s)',
    numberOfRecipes: 2,
    limit: 6,
    totalPages: 1,
    currentPage: 1,
    recipes: [{
      id: 2,
      title: 'Meat Pie',
      ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.',
      procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga.',
      recipeImage: 'recipeTwo.jpg',
      viewsCount: 0,
      upvotes: 0,
      downvotes: 0,
      hasOwnerViewed: false,
      userId: 1,
      createdAt: '2018-02-05T18:12:02.955Z',
      updatedAt: '2018-02-05T18:12:02.955Z'
    },
    {
      id: 1,
      title: 'Sweet Cake Cup',
      ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.',
      procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga.',
      recipeImage: 'recipeOne.jpg',
      viewsCount: 1,
      upvotes: 0,
      downvotes: 0,
      hasOwnerViewed: true,
      userId: 1,
      createdAt: '2018-02-05T17:30:32.619Z',
      updatedAt: '2018-02-05T17:59:27.533Z'
    }
    ]
  },
  userRecipesResponse: {
    status: 'Success',
    message: 'Successfully retrieved your recipe(s)',
    numberOfRecipes: 1,
    limit: 6,
    totalPages: 1,
    currentPage: 1,
    recipes: [{
      id: 1,
      title: 'Meat Pie',
      ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.',
      procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga.',
      recipeImage: 'recipeTwo.jpg',
      viewsCount: 0,
      upvotes: 0,
      downvotes: 0,
      hasOwnerViewed: false,
      userId: 1,
      createdAt: '2018-02-05T18:12:02.955Z',
      updatedAt: '2018-02-05T18:12:02.955Z'
    }]
  },
  singleRecipe: {
    status: 'Success',
    message: 'Successfully retrieved recipe',
    recipe: {
      id: 1,
      title: 'Sweet Cake Cup',
      ingredients: 'maggie. gsiisy. hhsbhsh. nhsgs. gagaga.',
      procedures: 'sssddhhd. bdghdhb. hdbvhbdbjs. jsbdhdhaaga.',
      recipeImage: 'recipeOne.jpg',
      viewsCount: 1,
      upvotes: 0,
      downvotes: 0,
      hasOwnerViewed: true,
      userId: 1,
      createdAt: '2018-02-05T17:30:32.619Z',
      updatedAt: '2018-02-05T17:42:07.942Z',
      User: {
        fullName: 'John Doe'
      },
      Reviews: []
    },
    isFavorited: false,
    vote: ''
  }
};

export default data;
