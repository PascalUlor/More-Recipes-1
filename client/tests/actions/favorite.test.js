/* eslint-disable */
import addFavoriteRecipe
  from '../../actions/actionCreators/addFavoriteRecipeActions';
import deleteFavoriteRecipe
  from '../../actions/actionCreators/deleteFavoriteRecipeActions';
import getFavoriteRecipes
  from '../../actions/actionCreators/getFavoriteRecipesActions';
import * as types from '../../actions/actionTypes/actionTypes';
import mockData from '../__mocks__/data/favoriteData';

describe('user favorite recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('add favorite recipe action', () => {
    it('should add user\'s favorite recipe', (done) => {
      const { addSuccess } = mockData, recipeId = 2;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}/favorites`, {
        status: 201,
        response: addSuccess
      });

      const { message } = addSuccess;
      const expectedActions = [
        { type: types.ADD_FAVORITE_RECIPE_SUCCESS, message }
      ];
      const store = mockStore({});
      return store.dispatch(addFavoriteRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should catch an error when adding a user favorite recipe', (done) => {
      const { addError404 } = mockData, recipeId = 2;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}/favorites`, {
        status: 404,
        response: addError404
      });

      const expectedActions = [
        { type: types.ADD_FAVORITE_RECIPE_FAILURE, error: addError404.message }
      ];
      const store = mockStore({});
      return store.dispatch(addFavoriteRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  // //
  describe('get favorite recipes action', () => {
    it('should get user\'s favorite recipes', (done) => {
      const { getSuccess } = mockData, page = 1;
      moxios.stubRequest(`/api/v1/user/favorites?page=${page}`, {
        status: 200,
        response: getSuccess
      });
      const favoriteRecipes = getSuccess;
      const expectedActions = [
        { type: types.IS_FAVORITE_RECIPES_FETCHING, bool: true },
        { type: types.FETCH_FAVORITE_RECIPES_SUCCESS, favoriteRecipes },
        { type: types.IS_FAVORITE_RECIPES_FETCHING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(getFavoriteRecipes(page))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should catch an error when getting a user\'s' +
      'favorite recipe', (done) => {
      const { getError } = mockData, page = 1;
      moxios.stubRequest(`/api/v1/user/favorites?page=${page}`, {
        status: 404,
        response: getError
      });

      const expectedActions = [
        { type: types.IS_FAVORITE_RECIPES_FETCHING, bool: true },
        { type: types.FETCH_FAVORITE_RECIPES_FAILURE, error: getError.message },
        { type: types.IS_FAVORITE_RECIPES_FETCHING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(getFavoriteRecipes(page))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('delete favorite recipe action', () => {
    it('should delete a user favorite recipe', (done) => {
      const { deleteSuccess } = mockData, recipeId = 2;
      moxios.stubRequest(`/api/v1/user/favorites/${recipeId}`, {
        status: 200,
        response: deleteSuccess
      });

      const { message } = deleteSuccess;
      const expectedActions = [
        { type: types.DELETE_FAVORITE_RECIPE_SUCCESS, recipeId, message }
      ];
      const store = mockStore({});
      return store.dispatch(deleteFavoriteRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should catch an error when deleting a user favorite recipe', (done) => {
      const { deleteError404 } = mockData, recipeId = 2;
      moxios.stubRequest(`/api/v1/user/favorites/${recipeId}`, {
        status: 404,
        response: deleteError404
      });

      const expectedActions = [{
        type: types.DELETE_FAVORITE_RECIPE_FAILURE,
        error: deleteError404.message
      }];
      const store = mockStore({});
      return store.dispatch(deleteFavoriteRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
