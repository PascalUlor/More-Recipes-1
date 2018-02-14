/* eslint-disable */
import createRecipe from '../../actions/actionCreators/createRecipeActions';
import editRecipe from '../../actions/actionCreators/editRecipeActions';
import deleteUserRecipe from '../../actions/actionCreators/deleteRecipeActions';
import {
  fetchAllRecipesRequest
} from '../../actions/actionCreators/getAllRecipesActions';
import popularRecipes from '../../actions/actionCreators/popularRecipesActions';
import getUserRecipes from '../../actions/actionCreators/getUserRecipesActions';
import setRecipe from '../../actions/actionCreators/setCurrentRecipeActions';
import checkDoubleTitle from '../../actions/actionCreators/checkDoubleRecipeTitle';
import * as types from '../../actions/actionTypes/actionTypes';
import mockData from '../__mocks__/data/recipeData';

describe('recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('create recipe actions', () => {
    it('should create a new recipe', (done) => {
      const { createData, createResponse } = mockData;
      moxios.stubRequest('/api/v1/recipes', {
        status: 201,
        response: createResponse
      });
      const { recipe, message } = createResponse;
      const createdRecipe = recipe;
      const expectedActions = [
        { type: types.IS_RECIPE_CREATING, bool: true },
        { type: types.CREATE_RECIPE_SUCCESS, createdRecipe, message },
        { type: types.IS_RECIPE_CREATING, bool: false }
      ];

      const store = mockStore({});
      return store.dispatch(createRecipe(createData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should catch an error when recipe title aready exit', (done) => {
      const { createData, doubleTitleResponse } = mockData;
      moxios.stubRequest('/api/v1/recipes', {
        status: 409,
        response: doubleTitleResponse
      });

      const expectedActions = [
        { type: types.IS_RECIPE_CREATING, bool: true },
        {
          type: types.CREATE_RECIPE_FAILURE,
          error: doubleTitleResponse.message
        },
        { type: types.IS_RECIPE_CREATING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(createRecipe(createData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('update recipe actions', () => {
    it('should update a recipe', (done) => {
      const { updateData, updateResponse } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${updateData.id}`, {
        status: 200,
        response: updateResponse
      });

      const { recipe, message } = updateResponse;
      const updatedRecipe = recipe;
      const expectedActions = [
        { type: types.IS_RECIPE_UPDATING, bool: true },
        { type: types.UPDATE_RECIPE_SUCCESS, updatedRecipe, message },
        { type: types.IS_RECIPE_UPDATING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(editRecipe(updateData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should catch an error when updating a recipe', (done) => {
      const { updateData, updateError } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${updateData.id}`, {
        status: 401,
        response: updateError
      });

      const expectedActions = [
        { type: types.IS_RECIPE_UPDATING, bool: true },
        { type: types.UPDATE_RECIPE_FAILURE, error: updateError.message },
        { type: types.IS_RECIPE_UPDATING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(editRecipe(updateData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('delete recipe actions', () => {
    it('should delete a user recipe', (done) => {
      const { deleteRecipeResponse } = mockData, recipeId = 2;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 200,
        response: deleteRecipeResponse
      });

      const { message } = deleteRecipeResponse;
      const expectedActions = [
        { type: types.IS_RECIPE_DELETING, bool: true },
        { type: types.DELETE_RECIPE_SUCCESS, recipeId, message },
        { type: types.IS_RECIPE_DELETING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(deleteUserRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should catch an error when deleting a user recipe', (done) => {
      const { deleteRecipeError } = mockData, recipeId = 2;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 401,
        response: deleteRecipeError
      });

      const expectedActions = [
        { type: types.IS_RECIPE_DELETING, bool: true },
        {
          type: types.DELETE_RECIPE_FAILURE,
          error: deleteRecipeError.message
        },
        { type: types.IS_RECIPE_DELETING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(deleteUserRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('get all recipes actions', () => {
    const page = 1,
      value = undefined;
    it('should get all recipes in the application', (done) => {
      moxios.stubRequest(`/api/v1/recipes?page=${page}&search=${value}`, {
        status: 200,
        response: mockData.allRecipesResponse
      });

      const expectedActions = [
        { type: types.IS_ALL_RECIPES_FETCHING, bool: true },
        { type: types.FETCH_ALL_RECIPES_SUCCESS, allRecipes: mockData.allRecipesResponse },
        { type: types.IS_ALL_RECIPES_FETCHING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchAllRecipesRequest(page, value))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it('should catch an error when retrieving all recipes', (done) => {
      const message = 'There are no available recipes';
      moxios.stubRequest(`/api/v1/recipes?page=${page}&search=${value}`, {
        status: 404,
        response: { message }
      });

      const expectedActions = [
        { type: types.IS_ALL_RECIPES_FETCHING, bool: true },
        { type: types.FETCH_ALL_RECIPES_FAILURE, error: message },
        { type: types.IS_ALL_RECIPES_FETCHING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchAllRecipesRequest(page, value))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('get all popular recipes actions', () => {
    it('should get all popular recipes in the application', (done) => {
      const { allRecipesResponse } = mockData;
      moxios.stubRequest('/api/v1/recipes?sort=upvotes&order=desc', {
        status: 200,
        response: allRecipesResponse
      });
      const { recipes } = allRecipesResponse;
      const expectedActions = [
        { type: types.IS_POPULAR_RECIPES_FETCHING, bool: true },
        { type: types.FETCH_POPULAR_RECIPES_SUCCESS, popularRecipes: recipes },
        { type: types.IS_POPULAR_RECIPES_FETCHING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(popularRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it('should catch an error when retrieving popular recipes', (done) => {
      const message = 'There are no available recipes';
      moxios.stubRequest('/api/v1/recipes?sort=upvotes&order=desc', {
        status: 404,
        response: { message }
      });

      const expectedActions = [
        { type: types.IS_POPULAR_RECIPES_FETCHING, bool: true },
        { type: types.FETCH_POPULAR_RECIPES_FAILURE, error: message },
        { type: types.IS_POPULAR_RECIPES_FETCHING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(popularRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('get all user recipes actions', () => {
    const page = 1;
    it('should get all user recipes in the application', (done) => {
      moxios.stubRequest(`/api/v1/user/recipes?page=${page}`, {
        status: 200,
        response: mockData.userRecipesResponse
      });

      const userRecipes = mockData.userRecipesResponse;
      const expectedActions = [
        { type: types.IS_USER_RECIPES_FETCHING, bool: true },
        { type: types.FETCH_USER_RECIPES_SUCCESS, userRecipes },
        { type: types.IS_USER_RECIPES_FETCHING, bool: false }
      ];

      const store = mockStore({});
      return store.dispatch(getUserRecipes(page))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should catch an error when retrieving all user recipes', (done) => {
      const error = 'There are no available recipes';
      moxios.stubRequest(`/api/v1/user/recipes?page=${page}`, {
        status: 404,
        response: { message: error }
      });

      const expectedActions = [
        { type: types.IS_USER_RECIPES_FETCHING, bool: true },
        { type: types.FETCH_USER_RECIPES_FAILURE, error },
        { type: types.IS_USER_RECIPES_FETCHING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(getUserRecipes(page))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('get currently selected recipe actions', () => {
    const recipeId = 1;
    it('should get and store details of currently selected recipe', (done) => {
      const { singleRecipe } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 200,
        response: singleRecipe
      });

      const expectedActions = [
        { type: types.SET_RECIPE_ID, id: recipeId },
        { type: types.SET_CURRENT_RECIPE, recipe: singleRecipe }
      ];

      const store = mockStore({});
      return store.dispatch(setRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should catch an error when getting selected recipe', (done) => {
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 404,
        response: {}
      });

      const expectedActions = [
        { type: types.SET_RECIPE_ID, id: 0 },
        { type: types.SET_CURRENT_RECIPE, recipe: {} }
      ];
      const store = mockStore({});
      return store.dispatch(setRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('check double recipe title action', () => {
    const title = 'Sweet Nigerian Salad';
    it('should get and store details of currently selected recipe', (done) => {
      moxios.stubRequest('/api/v1/recipes/checkTitle', {
        status: 200,
        response: ''
      });

      const expectedActions = [
        { type: types.IS_RECIPE_TITLE_DOUBLE, bool: false },
        { type: types.DOUBLE_RECIPE_TITLE_ERROR, error: '' }
      ];

      const store = mockStore({});
      return store.dispatch(checkDoubleTitle(title))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should catch an error when getting selected recipe', (done) => {
      const error =
        `Recipe with title: ${title},already exist in your catalog`;
      moxios.stubRequest('/api/v1/recipes/checkTitle', {
        status: 409,
        response: {
          message: error
        }
      });

      const expectedActions = [
        { type: types.IS_RECIPE_TITLE_DOUBLE, bool: true },
        { type: types.DOUBLE_RECIPE_TITLE_ERROR, error }
      ];
      const store = mockStore({});
      return store.dispatch(checkDoubleTitle(title))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
