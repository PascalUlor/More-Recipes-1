import { resolve } from 'path';
import {
  validSignup1, validSignup2,
  invalidSignUp, invalidSignin, invalidRecipe,
  validRecipe, profileValid
} from './mockData';

const short = 1000,
  medium = 2000,
  long = 4000,
  veryLong = 7000;

export default {
  'Render home page correctly':
  (browser) => {
    browser
      .url('http://localhost:7777')
      .waitForElementVisible('body', medium)
      .assert.title('More Recipes')
      .assert.visible('.navbar')
      .assert.visible('main.landing')
      .assert.visible('h3.page-header')
      .assert
      .containsText('div.text-warning', 'There are no recipes to display')
      .assert.visible('.footer')
      .pause(short)
      .click('.btn.btn-lg.btn-warning')
      .assert.urlEquals('http://localhost:7777/signup')
      .pause(short);
  },
  'SignUp will fail with invalid input':
  (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/signup')
      .assert.visible('img')
      .assert.visible('#fullName')
      .assert.visible('#username')
      .assert.visible('#email')
      .assert.visible('#password')
      .assert.visible('#repassword')
      .assert.visible('.btn')
      .click('.btn')
      .pause(medium)
      .setValue('#fullName', invalidSignUp.fullName)
      .setValue('#username', invalidSignUp.username)
      .setValue('#email', invalidSignUp.username)
      .setValue('#password', invalidSignUp.password)
      .setValue('#repassword', invalidSignUp.repassword)
      .pause(medium)
      .click('.btn')
      .assert.visible('.text-danger.small')
      .pause(long);
  },
  'SignUp user with valid user credentials':
  (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/signup')
      .assert.visible('img')
      .assert.visible('#fullName')
      .assert.visible('#username')
      .assert.visible('.btn')
      .pause(medium)
      .clearValue('#fullName')
      .setValue('#fullName', validSignup1.fullName)
      .clearValue('#username')
      .setValue('#username', validSignup1.username)
      .clearValue('#email')
      .setValue('#email', validSignup1.email)
      .clearValue('#password')
      .setValue('#password', validSignup1.password)
      .clearValue('#repassword')
      .setValue('#repassword', validSignup1.repassword)
      .pause(short)
      .click('.btn')
      .pause(medium);
  },
  'Render Dashboard properly':
  (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/dashboard')
      .assert.visible('.alert-success')
      .assert.visible('h1.display-3', 'Welcome, Awesome Cook!')
      .click('.dropdown-toggle.nav-button')
      .pause(medium)
      .assert.visible('#logout')
      .pause(medium)
      .click('#logout')
      .pause(medium);
  },
  'Sign in should fail for empty fields and unregistered user':
  (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/')
      .click('a.btn.btn-link')
      .pause(short)
      .assert.urlEquals('http://localhost:7777/signin')
      .pause(short)
      .assert.visible('img')
      .assert.visible('#username')
      .assert.visible('#password')
      .assert.visible('button.btn')
      .click('button.btn')
      .assert.visible('.text-danger.small')
      .pause(long)
      .setValue('#username', invalidSignin.username)
      .setValue('#password', invalidSignin.password)
      .pause(short)
      .click('button.btn')
      .pause(medium)
      .assert.visible('.alert-danger')
      .assert.containsText('.alert-danger', 'Invalid username or password')
      .pause(medium);
  },
  'Sign in a registered user':
  (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/signin')
      .clearValue('#username')
      .setValue('#username', validSignup1.username)
      .clearValue('#password')
      .setValue('#password', validSignup1.password)
      .pause(medium)
      .click('button.btn')
      .pause(medium);
  },
  'AllRecipes Page: user sees no recipes when none is found':
    (browser) => {
      browser
        .url('http://localhost:7777/recipes')
        .pause(short)
        .waitForElementVisible('div.not-found', short)
        .assert.containsText('div.not-found', 'There are no available recipes')
        .assert.visible('.footer')
        .assert.containsText('#search', '')
        .pause(short);
    },
  'MyRecipes Page: user sees no recipes when none is found':
    (browser) => {
      browser
        .url('http://localhost:7777/user/recipes')
        .pause(short)
        .assert.containsText('div.not-found', 'You have no available recipes')
        .assert.visible('h3.page-header')
        .assert.containsText('h3.page-header', 'My Recipes')
        .assert.visible('button.btn-outline-success')
        .assert.containsText('button.btn-outline-success', 'Create Recipe')
        .assert.visible('.footer')
        .pause(short);
    },
  'MyFavorites Page: user sees no recipes when none is found':
    (browser) => {
      browser
        .url('http://localhost:7777/user/favorites')
        .pause(short)
        .assert.containsText('div.not-found', 'You have no favorite recipes')
        .assert.visible('h3.page-header')
        .assert.containsText('h3.page-header', 'My Favorites')
        .assert.visible('.footer')
        .pause(short);
    },
  'Create Recipe: user cannot create new recipe if conditions are not meet':
    (browser) => {
      browser
        .url('http://localhost:7777/user/recipes')
        .pause(short)
        .assert.visible('button.btn-outline-success')
        .assert.containsText('button.btn-outline-success', 'Create Recipe')
        .click('button.btn-outline-success')
        .pause(medium)
        .waitForElementVisible('div#createRecipeModal.modal.fade.show', short)
        .assert.visible('input.form-control')
        .pause(short)
        .click('button.btn-info')
        .waitForElementVisible('#title-error', short)
        .assert.containsText('#title-error', 'Recipe title is required')
        .assert
        .containsText('#ingredient-error', 'Recipe ingredients are required')
        .assert
        .containsText('#procedure-error', 'Recipe procedures are required')
        .pause(medium)
        .setValue('input[name=title]', invalidRecipe.title)
        .setValue('textarea[name=ingredients]', invalidRecipe.ingredients)
        .setValue('textarea[name=procedures]', invalidRecipe.procedures)
        .pause(medium)
        .click('button.btn-info')
        .waitForElementVisible('#title-error', short)
        .assert
        .containsText(
          '#title-error',
          'Recipe title must contain only alphabets'
        )
        .assert
        .containsText('#ingredient-error', 'Recipe ingredients provided ' +
          'must be atleast 20 to 1000 characters')
        .assert
        .containsText('#procedure-error', 'Recipe procedures provided must ' +
          'be atleast 30 to 1000 characters')
        .pause(medium);
    },
  'User should be able to create a recipe': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .pause(short)
      .assert.visible('button.btn-outline-success')
      .assert.containsText('button.btn-outline-success', 'Create Recipe')
      .assert.visible('input[name=title]')
      .clearValue('input[name=title]')
      .setValue('input[name=title]', validRecipe.title[0])
      .setValue('textarea[name=ingredients]', validRecipe.ingredients)
      .setValue('textarea[name=procedures]', validRecipe.procedures)
      .assert.visible('#imageSrc')
      .setValue(
        'input[type=file]',
        resolve(`${__dirname}/../client/assets/images/recipe.jpg`)
      )
      .pause(medium)
      .click('button.btn-info')
      .pause(veryLong);
  },
  'User should not be able to create a recipe with existing title':
  (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .pause(short)
      .assert.visible('button.btn-outline-success')
      .assert.containsText('button.btn-outline-success', 'Create Recipe')
      .click('button.btn-outline-success')
      .pause(short)
      .setValue('input[name=title]', validRecipe.title[0])
      .setValue('textarea[name=ingredients]', validRecipe.ingredients)
      .setValue('textarea[name=procedures]', validRecipe.procedures)
      .assert.visible('#imageSrc')
      .click('button.btn-info')
      .pause(medium)
      .assert.visible('#imageSrc')
      .assert.visible('input[name=title]')
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText(
        '.toast-message',
        `Recipe with title: ${validRecipe.title[0]},\
 already exist in your catalog`
      )
      .pause(medium);
  },
  'User should be able to create 2nd recipe ': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .pause(short)
      .assert.visible('input[name=title]')
      .clearValue('input[name=title]')
      .setValue('input[name=title]', validRecipe.title[1])
      .setValue('textarea[name=ingredients]', validRecipe.ingredients)
      .setValue('textarea[name=procedures]', validRecipe.procedures)
      .assert.visible('#imageSrc')
      .click('button.btn-info')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Successfully added new recipe')
      .pause(short);
  },
  'User should be able to create 3rd recipe ': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .pause(short)
      .assert.visible('button.btn-outline-success')
      .assert.containsText('button.btn-outline-success', 'Create Recipe')
      .click('button.btn-outline-success')
      .pause(short)
      .setValue('input[name=title]', validRecipe.title[2])
      .setValue('textarea[name=ingredients]', validRecipe.ingredients)
      .setValue('textarea[name=procedures]', validRecipe.procedures)
      .click('button.btn-info')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Successfully added new recipe')
      .pause(short);
  },
  'User should be able to create 4th recipe ': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .pause(short)
      .assert.visible('button.btn-outline-success')
      .assert.containsText('button.btn-outline-success', 'Create Recipe')
      .click('button.btn-outline-success')
      .pause(short)
      .setValue('input[name=title]', validRecipe.title[3])
      .setValue('textarea[name=ingredients]', validRecipe.ingredients)
      .setValue('textarea[name=procedures]', validRecipe.procedures)
      .click('button.btn-info')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Successfully added new recipe')
      .pause(short);
  },
  'User should be able to create 5th recipe ': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .pause(short)
      .assert.visible('button.btn-outline-success')
      .assert.containsText('button.btn-outline-success', 'Create Recipe')
      .click('button.btn-outline-success')
      .pause(short)
      .setValue('input[name=title]', validRecipe.title[4])
      .setValue('textarea[name=ingredients]', validRecipe.ingredients)
      .setValue('textarea[name=procedures]', validRecipe.procedures)
      .click('button.btn-info')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Successfully added new recipe')
      .pause(short);
  },
  'User should be able to create 6th recipe ': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .pause(short)
      .assert.visible('button.btn-outline-success')
      .assert.containsText('button.btn-outline-success', 'Create Recipe')
      .click('button.btn-outline-success')
      .pause(short)
      .setValue('input[name=title]', validRecipe.title[5])
      .setValue('textarea[name=ingredients]', validRecipe.ingredients)
      .setValue('textarea[name=procedures]', validRecipe.procedures)
      .click('button.btn-info')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Successfully added new recipe')
      .pause(short);
  },
  'User should be able to create 7th recipe ': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .pause(short)
      .assert.visible('button.btn-outline-success')
      .assert.containsText('button.btn-outline-success', 'Create Recipe')
      .click('button.btn-outline-success')
      .pause(short)
      .setValue('input[name=title]', validRecipe.title[6])
      .setValue('textarea[name=ingredients]', validRecipe.ingredients)
      .setValue('textarea[name=procedures]', validRecipe.procedures)
      .click('button.btn-info')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Successfully added new recipe')
      .pause(medium);
  },
  'User should be able to navigate pages': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .assert.visible('button.btn-outline-success')
      .assert.containsText('button.btn-outline-success', 'Create Recipe')
      .click('.rc-pagination-item-2')
      .pause(medium);
  },
  'user should be able to edit a recipe he/she created': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .click('i.fa-edit')
      .pause(medium)
      .assert.visible('#editRecipeModal')
      .clearValue('#title')
      .pause(medium)
      .setValue('#title', 'Sweet African Rice')
      .pause(medium)
      .click('button#edit-recipe')
      .pause(medium)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Successfully updated recipe')
      .pause(short);
  },

  'user should be able to delete a recipe he/she created': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/user/recipes')
      .click('i.fa-trash')
      .waitForElementVisible('#deleteRecipeModal', medium)
      .click('#delete-recipe')
      .waitForElementVisible('.toast-message', medium)
      .assert
      .containsText('.toast-message', 'Successfully delected recipe')
      .pause(short)
      .click('#all-recipes')
      .pause(long);
  },
  'user can search for recipe(s) in all recipes page': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/recipes')
      .setValue('input#search', 'fish')
      .pause(medium);
  },
  'user can view a recipe': (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/recipes')
      .click('img.card-img-top')
      .pause(short)
      .assert.urlContains('http://localhost:7777/recipes/6/recipe-details')
      .waitForElementVisible('img#recipe_image', medium)
      .assert.containsText('h2.page-text', 'Fish Pie')
      .assert.containsText('textarea', '')
      .pause(short);
  },
  'user can upvote or downvote a recipe': (browser) => {
    browser
      .assert.urlContains('http://localhost:7777/recipes/6/recipe-details')
      .assert.visible('i#downvote.fa-thumbs-o-down')
      .assert.visible('i#upvote.fa-thumbs-o-up')
      .click('i#downvote')
      .pause(medium)
      .assert
      .containsText('.toast-message', 'Thanks for downvoting')
      .assert.containsText('span.text-success', '0')
      .assert.containsText('span.text-danger', '1')
      .pause(medium)
      .click('i#upvote')
      .pause(medium)
      .assert
      .containsText('.toast-message', 'You upvoted')
      .assert.containsText('span.text-success', '1')
      .assert.containsText('span.text-danger', '0')
      .pause(short);
  },
  'user can not favorite his own recipe': (browser) => {
    browser
      .assert.urlContains('http://localhost:7777/recipes/6/recipe-details')
      .assert.visible('i#downvote.fa-thumbs-o-down')
      .assert.visible('i#upvote.fa-thumbs-up')
      .assert.containsText('span.text-success', '1')
      .assert.containsText('span.text-danger', '0')
      .click('i#favorite')
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText(
        '.toast-message',
        'Can not favorite a recipe created by you'
      )
      .pause(veryLong)
      .click('.dropdown-toggle.nav-button')
      .pause(medium)
      .waitForElementVisible('#logout', medium)
      .pause(short)
      .click('#profile')
      .pause(medium);
  },
  'user can view and edit his/her profile': (browser) => {
    browser
      .assert.urlContains('http://localhost:7777/user/profile')
      .assert.containsText('h3.page-header', 'My Profile')
      .assert.visible('label.page-text')
      .assert.visible('.btn-outline-info')
      .assert.visible('img#profile-image')
      .assert.containsText('span.beautify', 'john')
      .pause(short)
      .setValue('input[name=username]', profileValid.username)
      .setValue('input[name=location]', profileValid.location)
      .setValue('textarea', profileValid.aboutMe)
      .pause(short)
      .click('.btn-outline-info')
      .pause(medium)
      .assert
      .containsText('.toast-message', 'Successfully updated profile')
      .pause(veryLong)
      .click('.dropdown-toggle.nav-button')
      .pause(short)
      .assert.visible('#logout')
      .pause(short)
      .click('#logout')
      .pause(medium)
      .click('#signup')
      .pause(medium);
  },
  'SignUp another user with valid credentials':
  (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/signup')
      .assert.visible('img')
      .assert.visible('#fullName')
      .assert.visible('#username')
      .assert.visible('.btn')
      .pause(short)
      .clearValue('#fullName')
      .setValue('#fullName', validSignup2.fullName)
      .clearValue('#username')
      .setValue('#username', validSignup2.username)
      .clearValue('#email')
      .setValue('#email', validSignup2.email)
      .clearValue('#password')
      .setValue('#password', validSignup2.password)
      .clearValue('#repassword')
      .setValue('#repassword', validSignup2.repassword)
      .pause(short)
      .click('.btn')
      .pause(medium);
  },
  'render dashboard properly again':
  (browser) => {
    browser
      .assert.urlEquals('http://localhost:7777/dashboard')
      .assert.visible('.alert-success')
      .assert.visible('h1.display-3', 'Welcome, Awesome Cook!')
      .click('#favorites')
      .pause(medium);
  },
  'render favorites page with no recipes': (browser) => {
    browser
      .assert.urlContains('http://localhost:7777/user/favorites')
      .pause(short)
      .assert.containsText('div.not-found', 'You have no favorite recipes')
      .assert.visible('h3.page-header')
      .assert.containsText('h3.page-header', 'My Favorites')
      .assert.visible('.footer')
      .url('http://localhost:7777/recipes/6/recipe-details')
      .pause(medium);
  },
  'user should be able to favorite other user\'s recipes': (browser) => {
    browser
      .assert.urlContains('http://localhost:7777/recipes/6/recipe-details')
      .click('i#favorite')
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Recipe has been favorited')
      .pause(medium)
      .click('i#favorite')
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Recipe has been unfavorited')
      .pause(medium)
      .click('i#favorite')
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Recipe has been favorited')
      .pause(long);
  },
  'user should be able to post a review for a recipe ': (browser) => {
    browser
      .assert.urlContains('http://localhost:7777/recipes/6/recipe-details')
      .pause(short)
      .assert.visible('textarea')
      .assert.containsText('textarea', '')
      .setValue('textarea', 'This is nice.. Good job')
      .pause(medium)
      .click('.btn-outline-success')
      .waitForElementVisible('.toast-message', medium)
      .assert
      .containsText('.toast-message', 'Successfully posted review')
      .pause(veryLong)
      .click('#favorites')
      .pause(medium);
  },
  'user should be able to delete his favorited recipes': (browser) => {
    browser
      .assert.urlContains('http://localhost:7777/user/favorites')
      .pause(short)
      .assert.visible('div.card')
      .click('.btn-outline-danger')
      .waitForElementVisible('#deleteRecipeModal', medium)
      .pause(short)
      .click('#delete-recipe')
      .waitForElementVisible('.toast-message', medium)
      .assert
      .containsText('.toast-message', 'Successfully deleted Recipe')
      .assert.containsText('div.not-found', 'You have no favorite recipes')
      .pause(veryLong)
      .click('.dropdown-toggle.nav-button')
      .pause(medium)
      .assert.visible('#logout')
      .pause(short)
      .click('#logout')
      .pause(long)
      .end();
  },

};
