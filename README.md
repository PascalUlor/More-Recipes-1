[![Build Status](https://travis-ci.org/chykehyman/More-Recipes.svg?branch=fix_codeclimate)](https://travis-ci.org/chykehyman/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/chykehyman/More-Recipes/badge.svg?branch=fix_codeclimate)](https://coveralls.io/github/chykehyman/More-Recipes?branch=fix_code_climate)
[![Maintainability](https://api.codeclimate.com/v1/badges/b36cde19b8b50a231465/maintainability)](https://codeclimate.com/github/chykehyman/More-Recipes/maintainability)

# More Recipes
### Share Your Special Recipe Ideas Instanly
More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they
have invented or learnt. Suppose a user comes up with a recipe, he/she can post it on
More-Recipes and get feedback in form of reviews and votes from other users who explore that
recipe. Users can also keep a list of their favorite recipes on the application.

## Features
- User Signup and Signin
- Create/Add, modify or delete recipes
- View recipes from other users
- View details of recipes
- Post reviews on recipes
- Upvote or downvote recipes
- Bookmark recipes as favorites
- View user profile

## UI Templates
To View online hosted templates, copy and paste the following link in your browser
[More-Recipes] - https://chykehyman.github.io/More-Recipes/index.html 

## Installation
- install POSTMAN app
- run `npm run start:dev` then navigate to `localhost:3000` on POSTMAN

## API Routes
* [Landing page] - GET http://localhost:3000/
* [Create Recipe] - POST http://localhost:3000/api/recipes
* [Modify Recipe] - PUT http://localhost:3000/api/recipes/:recipeID
* [Delete Recipe] - POST http://localhost:3000/api/recipes/:recipeID
* [Fetch All Recipes] - GET http://localhost:3000/api/recipes
* [Post Recipe Review] - POST http://localhost:3000/api/recipes/:recipeID/reviews
* [Fetch Recipes by Most Upvotes] - POST http://localhost:3000/api/recipes?sort=upvotes&order=des

## Author
* **Chinwoke Hyginus** -Aspiring Software Developer.

## Acknowledgments
* Bootstrap
* Jquery
* Javascript