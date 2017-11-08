'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../middleware/validations/users');

var _users2 = _interopRequireDefault(_users);

var _users3 = require('../controllers/users');

var _users4 = _interopRequireDefault(_users3);

var _recipes = require('../middleware/validations/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _recipes3 = require('../controllers/recipes');

var _recipes4 = _interopRequireDefault(_recipes3);

var _reviews = require('../middleware/validations/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _reviews3 = require('../controllers/reviews');

var _reviews4 = _interopRequireDefault(_reviews3);

var _favorites = require('../controllers/favorites');

var _favorites2 = _interopRequireDefault(_favorites);

var _authToken = require('../middleware/authToken');

var _authToken2 = _interopRequireDefault(_authToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * User signup and sign in routes
 */
router.route('/users/signup').post(_users2.default.signup, _users4.default.signup);
router.route('/users/signin').post(_users2.default.signin, _users4.default.signin);

/**
 * Recipe routes
 */
// POST and GET routes to add a recipe and get recipes(sorted or not sorted formats)
router.route('/recipes').post(_authToken2.default, _recipes2.default.addRecipeValidations, _recipes4.default.addRecipe).get(_recipes2.default.getSortdedRecipesValidation, _recipes4.default.getRecipes);
// PUT and DELETE routes to modify/update and delete a recipe
router.route('/recipes/:recipeID').put(_authToken2.default, _recipes2.default.updateRecipeValidations, _recipes4.default.updateRecipe).delete(_authToken2.default, _recipes4.default.deleteRecipe);

/**
 * Recipe review routes
 */
// POST route to create/add a review for a recipe
router.route('/recipes/:recipeID/reviews').post(_authToken2.default, _reviews2.default.postReviewValidations, _reviews4.default.postReview);

/**
 * Recipe favorite routes
 */
// POST route to create/add user's favorite recipes
router.route('/users/:recipeID/recipes').post(_authToken2.default, _favorites2.default.addToFavorite);
// GET route to retrieve user's favorite recipes
router.route('/users/:userID/recipes').get(_authToken2.default, _favorites2.default.getFavoriteRecipes);

exports.default = router;