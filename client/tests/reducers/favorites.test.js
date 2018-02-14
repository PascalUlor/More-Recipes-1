import addFavorite from '../../reducers/addFavoriteRecipe';
import fetchFavorites from '../../reducers/fetchFavoriteRecipes';
import * as types from '../../actions/actionTypes/actionTypes';
import mockData from '../__mocks__/data/favoriteData';

describe('User Favorites Reducers', () => {
  describe('Add User favorite Recipe', () => {
    const initialState = {
      addFavoriteSuccess: '',
      addFavoriteError: ''
    };

    it('should return proper initial state', (done) => {
      expect(addFavorite(undefined, {})).toEqual(initialState);
      done();
    });

    it(
      'should set add favorite recipe success' +
      'messsage when passed ADD_FAVORITE_RECIPE_SUCCESS',
      (done) => {
        const { message } = mockData.addSuccess;
        const action = {
          type: types.ADD_FAVORITE_RECIPE_SUCCESS,
          message
        };

        const newState = addFavorite(initialState, action);
        expect(newState.addFavoriteSuccess).toEqual(action.message);
        expect(newState.addFavoriteError).toEqual('');
        done();
      }
    );

    it(
      'should set add favorite recipe failiure' +
      'messsage when passed ADD_FAVORITE_RECIPE_FAILURE',
      (done) => {
        const action = {
          type: types.ADD_FAVORITE_RECIPE_FAILURE,
          error: mockData.addError403
        };

        const newState = addFavorite(initialState, action);
        expect(newState.addFavoriteSuccess).toEqual('');
        expect(newState.addFavoriteError).toEqual(action.error);
        done();
      }
    );
  });

  describe('Get User Favorite Recipes', () => {
    const initialState = {
      isFavoriteRecipesFetching: false,
      fetchedFavoriteRecipes: [],
      paginationDetails: {
        currentPage: 0,
        limit: 6,
        numberOfRecipes: 0,
        totalPages: 0
      },
      favoriteRecipesError: '',
      deleteFavoriteSuccessMessage: '',
      deleteFavoriteError: ''
    };

    it('should return proper initial state', (done) => {
      expect(fetchFavorites(undefined, {})).toEqual(initialState);
      done();
    });

    it(
      'should set all recipes loader to true' +
      'when passed IS_FAVORITE_RECIPES_FETCHING',
      (done) => {
        const action = {
          type: types.IS_FAVORITE_RECIPES_FETCHING,
          bool: true
        };

        const newState = fetchFavorites(initialState, action);
        expect(newState.isFavoriteRecipesFetching).toEqual(action.bool);
        expect(newState.fetchedFavoriteRecipes).toHaveLength(0);
        expect(newState.favoriteRecipesError).toEqual('');
        done();
      }
    );

    it(
      'should set all user favorite recipes array' +
      'when passed FETCH_FAVORITE_RECIPES_SUCCESS',
      (done) => {
        const favoriteRecipes = mockData.getSuccess,
          {
            currentPage,
            limit,
            numberOfRecipes,
            totalPages
          } = mockData.getSuccess,
          paginationDetails = {
            currentPage,
            limit,
            numberOfRecipes,
            totalPages
          };

        const action = {
          type: types.FETCH_FAVORITE_RECIPES_SUCCESS,
          favoriteRecipes
        };

        const newState = fetchFavorites(initialState, action);
        expect(newState.isFavoriteRecipesFetching).toEqual(false);
        expect(newState.fetchedFavoriteRecipes).toHaveLength(1);
        expect(newState.fetchedFavoriteRecipes)
          .toEqual(expect.arrayContaining(favoriteRecipes.recipes));
        expect(newState.paginationDetails).toMatchObject(paginationDetails);
        expect(newState.favoriteRecipesError).toEqual('');
        done();
      }
    );

    it(
      'should set get user favorite recipes failure message when' +
      'passed FETCH_FAVORITE_RECIPES_FAILURE',
      (done) => {
        const error = mockData.getError;
        const action = {
          type: types.FETCH_FAVORITE_RECIPES_FAILURE,
          error
        };

        const newState = fetchFavorites(initialState, action);
        expect(newState.isFavoriteRecipesFetching).toEqual(false);
        expect(newState.fetchedFavoriteRecipes).toHaveLength(0);
        expect(newState.favoriteRecipesError).toEqual(error);
        done();
      }
    );
  });

  describe('Delete User Favorite Recipe', () => {
    const fetchedFavoriteRecipes = mockData.getSuccess.recipes,
      {
        currentPage,
        limit,
        numberOfRecipes,
        totalPages
      } = mockData.getSuccess,
      paginationDetails = {
        currentPage,
        limit,
        numberOfRecipes,
        totalPages
      };

    const currentState = {
      isFavoriteRecipesFetching: false,
      fetchedFavoriteRecipes,
      paginationDetails,
      favoriteRecipesError: '',
      deleteFavoriteSuccessMessage: '',
      deleteFavoriteError: ''
    };

    it(
      'should delete user favorite recipe' +
      'when passed DELETE_FAVORITE_RECIPE_SUCCESS',
      (done) => {
        const action = {
          type: types.DELETE_FAVORITE_RECIPE_SUCCESS,
          recipeId: fetchedFavoriteRecipes[0].recipeId,
          message: mockData.getSuccess.message
        };

        const newState = fetchFavorites(currentState, action);
        expect(newState.isFavoriteRecipesFetching).toEqual(false);
        expect(newState.fetchedFavoriteRecipes).toHaveLength(0);
        expect(newState.paginationDetails.numberOfRecipes).toBe(0);
        expect(newState.deleteFavoriteSuccessMessage).toEqual(action.message);
        expect(newState.deleteFavoriteError).toEqual('');
        done();
      }
    );

    it(
      'should set delete user favorite recipe failure message when' +
      'passed DELETE_FAVORITE_RECIPE_FAILURE',
      (done) => {
        const action = {
          type: types.DELETE_FAVORITE_RECIPE_FAILURE,
          error: mockData.deleteError404
        };

        const newState = fetchFavorites(currentState, action);
        expect(newState.isFavoriteRecipesFetching).toEqual(false);
        expect(newState.fetchedFavoriteRecipes).toHaveLength(1);
        expect(newState.paginationDetails.numberOfRecipes).toBe(1);
        expect(newState.deleteFavoriteSuccessMessage).toEqual('');
        expect(newState.deleteFavoriteError).toEqual(action.error);
        done();
      }
    );
  });
});
