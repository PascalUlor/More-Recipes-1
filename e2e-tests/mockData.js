const data = {
  validSignup1: {
    fullName: 'John Doe',
    username: 'john',
    email: 'johndoe@gmail.com',
    password: '12345678',
    repassword: '12345678'
  },
  validSignup2: {
    fullName: 'Annie Jones',
    username: 'annie',
    email: 'anniejones@gmail.com',
    password: '12345678',
    repassword: '12345678'
  },
  invalidSignUp: {
    fullName: 'John 45 Doe',
    username: '23john',
    email: 'johndoe@gmail',
    password: '1234567',
    repassword: '12345678'
  },
  invalidSignin: { username: 'doesnotexist', password: '1234567' },
  invalidRecipe: {
    title: 'Sweet Fried Rice 2',
    ingredients: 'onions. sugar',
    procedures: 'boil water first'
  },
  validRecipe: {
    title: [
      'Sweet Rice', 'Burger Pie', 'Sweet Cup Cake',
      'Iris Potato', 'Meat Pie', 'Fish Pie', 'Ice Cream'
    ],
    ingredients: '1/2 bottle of water. 2 table spoon salt. 1/2 cup of rice',
    procedures: 'Boil water for 10mins. Add rice into pot. Stir slightly',
  },
  recipeDetails: {
    name: 'Awesome recipe',
    directions: 'Do stuff, do stuff, do stuff',
    description: 'Test recipe',
    ingredients: 'Test, Recipe, Ingredient'
  },
  profileValid: {
    username: 'doejohn',
    location: 'Lagos',
    aboutMe: 'I am just a cool, regular guy'
  }
};

module.exports = data;
