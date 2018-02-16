import createRecipe from '../../reducers/createRecipe';
import deleteRecipe from '../../reducers/deleteUserRecipe';
import editRecipe from '../../reducers/editUserRecipe';
import getAllRecipes from '../../reducers/allRecipes';
import getUserRecipes from '../../reducers/fetchUserRecipes';
import getPopularRecipes from '../../reducers/popularRecipes';
import setCurrentRecipe from '../../reducers/setCurrentRecipe';
import * as types from '../../actions/actionTypes/actionTypes';
import recipeMockData from '../__mocks__/data/recipeData';
import reviewMockData from '../__mocks__/data/reviewData';
import voteMockData from '../__mocks__/data/voteData';

describe('Recipe Reducers', () => {
  describe('Create Recipe Reducer', () => {
    const initialState = {
      isRecipeCreating: false,
      createRecipeError: '',
      createRecipeSuccess: ''
    };

    it('should return proper initial state', (done) => {
      expect(createRecipe(undefined, {})).toEqual(initialState);
      done();
    });

    it(
      'should set recipe loader to true when passed IS_RECIPE_CREATING',
      (done) => {
        const action = {
          type: types.IS_RECIPE_CREATING,
          bool: true
        };

        const newState = createRecipe(initialState, action);
        expect(newState.isRecipeCreating).toEqual(true);
        expect(newState.createRecipeSuccess).toEqual('');
        expect(newState.createRecipeError).toEqual('');
        done();
      }
    );

    it(
      'should set create recipe success' +
      'messsage when passed CREATE_RECIPE_SUCCESS',
      (done) => {
        const createdRecipe = recipeMockData.createResponse,
          { message } = recipeMockData.createResponse;

        const action = {
          type: types.CREATE_RECIPE_SUCCESS,
          createdRecipe,
          message
        };

        const newState = createRecipe(initialState, action);
        expect(newState.isRecipeCreating).toEqual(false);
        expect(newState.createRecipeSuccess).toEqual(message);
        expect(newState.createRecipeError).toEqual('');
        done();
      }
    );

    it(
      'should set create recipe error' +
      'messsage when passed CREATE_RECIPE_FAILURE',
      (done) => {
        const error = recipeMockData.doubleTitleResponse;

        const action = {
          type: types.CREATE_RECIPE_FAILURE,
          error
        };

        const newState = createRecipe(initialState, action);
        expect(newState.isRecipeCreating).toEqual(false);
        expect(newState.createRecipeSuccess).toEqual('');
        expect(newState.createRecipeError).toEqual(error);
        done();
      }
    );
  });
  describe('Delete Recipe Reducer', () => {
    const initialState = {
      isRecipeDeleting: false,
      deleteRecipeSuccess: '',
      deleteRecipeError: ''
    };
    it('should return proper initial state', (done) => {
      expect(deleteRecipe(undefined, {})).toEqual(initialState);
      done();
    });

    it(
      'should set delete recipe loader to true when passed IS_RECIPE_DELETING',
      (done) => {
        const action = {
          type: types.IS_RECIPE_DELETING,
          bool: true
        };

        const newState = deleteRecipe(initialState, action);
        expect(newState.isRecipeDeleting).toEqual(true);
        expect(newState.deleteRecipeSuccess).toEqual('');
        expect(newState.deleteRecipeError).toEqual('');
        done();
      }
    );

    it(
      'should set delete recipe success ' +
      'messsage when passed DELETE_RECIPE_SUCCESS',
      (done) => {
        const recipeId = recipeMockData.deleteRecipeResponse.recipe.id,
          { message } = recipeMockData.deleteRecipeResponse;

        const action = {
          type: types.DELETE_RECIPE_SUCCESS,
          recipeId,
          message
        };

        const newState = deleteRecipe(initialState, action);
        expect(newState.isRecipeDeleting).toEqual(false);
        expect(newState.deleteRecipeSuccess).toEqual(message);
        expect(newState.deleteRecipeError).toEqual('');
        done();
      }
    );

    it(
      'should set delete recipe success ' +
      'messsage when passed DELETE_RECIPE_FAILURE',
      (done) => {
        const error = 'An Error occurred';

        const action = {
          type: types.DELETE_RECIPE_FAILURE,
          error
        };

        const newState = deleteRecipe(initialState, action);
        expect(newState.isRecipeDeleting).toEqual(false);
        expect(newState.deleteRecipeSuccess).toEqual('');
        expect(newState.deleteRecipeError).toEqual(error);
        done();
      }
    );
  });
  describe('Edit Recipe Reducer', () => {
    const initialState = {
      isRecipeUpdating: false,
      updateRecipeSuccess: '',
      updateRecipeError: ''
    };

    it('should return proper initial state', (done) => {
      expect(editRecipe(undefined, {})).toEqual(initialState);
      done();
    });

    it(
      'should set edit recipe loader to true when passed IS_RECIPE_UPDATING',
      (done) => {
        const action = {
          type: types.IS_RECIPE_UPDATING,
          bool: true
        };

        const newState = editRecipe(initialState, action);
        expect(newState.isRecipeUpdating).toEqual(true);
        expect(newState.updateRecipeSuccess).toEqual('');
        expect(newState.updateRecipeError).toEqual('');
        done();
      }
    );

    it(
      'should set update recipe success' +
      'messsage when passed UPDATE_RECIPE_SUCCESS',
      (done) => {
        const updatedRecipe = recipeMockData.updateResponse.recipe,
          { message } = recipeMockData.updateResponse;

        const action = {
          type: types.UPDATE_RECIPE_SUCCESS,
          updatedRecipe,
          message
        };

        const newState = editRecipe(initialState, action);
        expect(newState.isRecipeUpdating).toEqual(false);
        expect(newState.updateRecipeSuccess).toEqual(message);
        expect(newState.updateRecipeError).toEqual('');
        done();
      }
    );

    it(
      'should set create recipe error' +
      'messsage when passed CREATE_RECIPE_FAILURE',
      (done) => {
        const error = recipeMockData.doubleTitleResponse;

        const action = {
          type: types.UPDATE_RECIPE_FAILURE,
          error
        };

        const newState = editRecipe(initialState, action);
        expect(newState.isRecipeUpdating).toEqual(false);
        expect(newState.updateRecipeSuccess).toEqual('');
        expect(newState.updateRecipeError).toEqual(action.error);
        done();
      }
    );
  });
  describe('All Recipes Reducers', () => {
    const initialState = {
      isAllRecipesFetching: false,
      fetchedAllRecipes: [],
      paginationDetails: {
        currentPage: 0,
        limit: 6,
        numberOfRecipes: 0,
        totalPages: 0
      },
      allRecipesError: ''
    };

    it('should return proper initial state', (done) => {
      expect(getAllRecipes(undefined, {})).toEqual(initialState);
      done();
    });

    it(
      'should set all recipes loader to true' +
      'when passed IS_ALL_RECIPES_FETCHING',
      (done) => {
        const action = {
          type: types.IS_ALL_RECIPES_FETCHING,
          bool: true
        };

        const newState = getAllRecipes(initialState, action);
        expect(newState.isAllRecipesFetching).toEqual(true);
        expect(newState.fetchedAllRecipes).toHaveLength(0);
        expect(newState.allRecipesError).toEqual('');
        done();
      }
    );

    it(
      'should set all recipes array when passed FETCH_ALL_RECIPES_SUCCESS',
      (done) => {
        const allRecipes = recipeMockData.allRecipesSuccess,
          {
            currentPage,
            limit,
            numberOfRecipes,
            totalPages
          } = recipeMockData.allRecipesSuccess,
          paginationDetails = {
            currentPage,
            limit,
            numberOfRecipes,
            totalPages
          };

        const action = {
          type: types.FETCH_ALL_RECIPES_SUCCESS,
          allRecipes
        };

        const newState = getAllRecipes(initialState, action);
        expect(newState.isAllRecipesFetching).toEqual(false);
        expect(newState.fetchedAllRecipes).toHaveLength(2);
        expect(newState.fetchedAllRecipes)
          .toEqual(expect.arrayContaining(allRecipes.recipes));
        expect(newState.paginationDetails).toMatchObject(paginationDetails);
        expect(newState.allRecipesError).toEqual('');
        done();
      }
    );
  });
  describe('All User Recipes Reducer', () => {
    const initialState = {
      isUserRecipesFetching: false,
      fetchedUserRecipes: [],
      paginationDetails: {
        currentPage: 0,
        limit: 6,
        numberOfRecipes: 0,
        totalPages: 0
      },
      userRecipesError: ''
    };
    let currentState;

    it('should return proper initial state', (done) => {
      expect(getUserRecipes(undefined, {})).toEqual(initialState);
      done();
    });

    it(
      'should set all recipes loader to true' +
      'when passed IS_USER_RECIPES_FETCHING',
      (done) => {
        const action = {
          type: types.IS_USER_RECIPES_FETCHING,
          bool: true
        };

        const newState = getUserRecipes(initialState, action);
        expect(newState.isUserRecipesFetching).toEqual(true);
        expect(newState.fetchedUserRecipes).toHaveLength(0);
        expect(newState.userRecipesError).toEqual('');
        done();
      }
    );

    it(
      'should set all recipes array when passed FETCH_ALL_RECIPES_SUCCESS',
      (done) => {
        const userRecipes = recipeMockData.allRecipesSuccess,
          {
            currentPage,
            limit,
            numberOfRecipes,
            totalPages
          } = recipeMockData.allRecipesSuccess,
          paginationDetails = {
            currentPage,
            limit,
            numberOfRecipes,
            totalPages
          };

        const action = {
          type: types.FETCH_USER_RECIPES_SUCCESS,
          userRecipes
        };

        const newState = getUserRecipes(initialState, action);
        expect(newState.isUserRecipesFetching).toEqual(false);
        expect(newState.fetchedUserRecipes).toHaveLength(2);
        expect(newState.fetchedUserRecipes)
          .toEqual(expect.arrayContaining(userRecipes.recipes));
        expect(newState.paginationDetails).toMatchObject(paginationDetails);
        expect(newState.userRecipesError).toEqual('');
        done();
      }
    );
    it(
      'should set get user recipes error message when' +
      'passed FETCH_USER_RECIPES_FAILURE',
      (done) => {
        const { paginationDetails } = initialState;
        const error = 'You have no available recipes';
        const action = {
          type: types.FETCH_USER_RECIPES_FAILURE,
          error
        };

        const newState = getUserRecipes(initialState, action);
        expect(newState.isUserRecipesFetching).toEqual(false);
        expect(newState.fetchedUserRecipes).toHaveLength(0);
        expect(newState.paginationDetails).toMatchObject(paginationDetails);
        expect(newState.userRecipesError).toEqual(error);
        done();
      }
    );
    it(
      'should set created user recipe object when passed CREATE_RECIPE_SUCCESS',
      (done) => {
        const createdRecipe = recipeMockData.createResponse,
          { message } = recipeMockData.createResponse;

        const action = {
          type: types.CREATE_RECIPE_SUCCESS,
          createdRecipe,
          message
        };

        const newState = getUserRecipes(initialState, action);
        expect(newState.isUserRecipesFetching).toEqual(false);
        expect(newState.fetchedUserRecipes).toHaveLength(1);
        expect(newState.paginationDetails.numberOfRecipes)
          .toEqual(initialState.paginationDetails.numberOfRecipes + 1);
        expect(newState.userRecipesError).toEqual('');
        done();
      }
    );
    it(
      'should set created user recipe object when passed UPDATE_RECIPE_SUCCESS',
      (done) => {
        const createdRecipe = recipeMockData.createResponse.recipe,
          updatedRecipe = recipeMockData.updateResponse.recipe,
          { message } = recipeMockData.updateResponse;
        currentState = {
          isUserRecipesFetching: false,
          fetchedUserRecipes: [
            createdRecipe
          ],
          paginationDetails: {
            currentPage: 1,
            limit: 6,
            numberOfRecipes: 1,
            totalPages: 1
          },
          userRecipesError: ''
        };

        const action = {
          type: types.UPDATE_RECIPE_SUCCESS,
          updatedRecipe,
          message
        };

        const newState = getUserRecipes(currentState, action);
        expect(newState.isUserRecipesFetching).toEqual(false);
        expect(newState.fetchedUserRecipes).toHaveLength(1);
        expect(newState.fetchedUserRecipes[0].id).toEqual(updatedRecipe.id);
        expect(newState.fetchedUserRecipes[0].title)
          .toEqual(updatedRecipe.title);
        expect(newState.paginationDetails.numberOfRecipes)
          .toBe(1);
        expect(newState.userRecipesError).toEqual('');
        done();
      }
    );
    it(
      'should set delete recipe success ' +
      'messsage when passed DELETE_RECIPE_SUCCESS',
      (done) => {
        const recipeId = recipeMockData.updateResponse.recipe.id,
          { message } = recipeMockData.updateResponse;

        const action = {
          type: types.DELETE_RECIPE_SUCCESS,
          recipeId,
          message
        };

        const newState = getUserRecipes(currentState, action);
        expect(newState.isUserRecipesFetching).toEqual(false);
        expect(newState.fetchedUserRecipes).toHaveLength(0);
        expect(newState.paginationDetails.numberOfRecipes)
          .toBe(0);
        expect(newState.userRecipesError).toEqual('');
        done();
      }
    );
  });

  describe('Popular Recipes Reducer', () => {
    const initialState = {
      isPopularRecipesFetching: false,
      fetchedPopularRecipes: [],
      popularRecipesError: ''
    };

    it('should return proper initial state', (done) => {
      expect(getPopularRecipes(undefined, {})).toEqual(initialState);
      done();
    });

    it(
      'should set popular recipes loader to true' +
      'when passed IS_POPULAR_RECIPES_FETCHING',
      (done) => {
        const action = {
          type: types.IS_POPULAR_RECIPES_FETCHING,
          bool: true
        };

        const newState = getPopularRecipes(initialState, action);
        expect(newState.isPopularRecipesFetching).toEqual(true);
        expect(newState.fetchedPopularRecipes).toHaveLength(0);
        expect(newState.popularRecipesError).toEqual('');
        done();
      }
    );

    it(
      'should set popular recipes array when' +
      'passed FETCH_POPULAR_RECIPES_SUCCESS',
      (done) => {
        const action = {
          type: types.FETCH_POPULAR_RECIPES_SUCCESS,
          popularRecipes: recipeMockData.allRecipesSuccess.recipes
        };

        const newState = getPopularRecipes(initialState, action);
        expect(newState.isPopularRecipesFetching).toEqual(false);
        expect(newState.fetchedPopularRecipes).toHaveLength(2);
        expect(newState.popularRecipesError).toEqual('');
        done();
      }
    );
    it(
      'should set get popular recipes error message when' +
      'passed FETCH_POPULAR_RECIPES_FAILURE',
      (done) => {
        const error = 'There are no available recipes';
        const action = {
          type: types.FETCH_POPULAR_RECIPES_FAILURE,
          error
        };

        const newState = getPopularRecipes(initialState, action);
        expect(newState.isPopularRecipesFetching).toEqual(false);
        expect(newState.fetchedPopularRecipes).toHaveLength(0);
        expect(newState.popularRecipesError).toEqual(action.error);
        done();
      }
    );
  });

  describe('Set Current Recipe Reducer', () => {
    const initialState = {
      currentSetRecipeId: 0,
      currentSetRecipe: {},
      voteSuccessMessage: '',
      voteFailureMessage: ''
    };

    it('should return proper initial state', (done) => {
      expect(setCurrentRecipe(undefined, {})).toEqual(initialState);
      done();
    });

    it(
      'should set currently selected recipe id' +
      'when passed SET_RECIPE_ID',
      (done) => {
        const action = {
          type: types.SET_RECIPE_ID,
          id: 1
        };

        const newState = setCurrentRecipe(initialState, action);
        expect(newState.currentSetRecipeId).toEqual(action.id);
        done();
      }
    );

    it(
      'should set currently selected recipe details when' +
      'passed SET_CURRENT_RECIPE',
      (done) => {
        const recipe = recipeMockData.singleRecipe;
        const action = {
          type: types.SET_CURRENT_RECIPE,
          recipe
        };

        const newState = setCurrentRecipe(initialState, action);
        expect(newState.currentSetRecipeId).toEqual(0);
        expect(newState.currentSetRecipe.recipe.Reviews).toHaveLength(0);
        expect(newState.currentSetRecipe.isFavorited).toBe(false);
        done();
      }
    );
    it(
      'should concatinate/add posted review when ' +
      'passed POST_REVIEW_SUCCESS',
      (done) => {
        const { postedReview, message } = reviewMockData.postResponse, {
          recipe
        } = recipeMockData.singleRecipe;

        const currentState = {
          currentSetRecipeId: 0,
          currentSetRecipe: {
            recipe
          },
          voteSuccessMessage: '',
          voteFailureMessage: ''
        };
        const action = {
          type: types.POST_REVIEW_SUCCESS,
          review: postedReview,
          message
        };

        const newState = setCurrentRecipe(currentState, action);
        expect(newState.currentSetRecipeId).toEqual(0);
        expect(newState.currentSetRecipe.recipe.Reviews).toHaveLength(1);
        done();
      }
    );

    it(
      'should set user vote when ' +
      'passed VOTE_RECIPE_SUCCESS',
      (done) => {
        const { recipe } = recipeMockData.singleRecipe, {
          voteSuccess
        } = voteMockData;

        const currentState = {
          currentSetRecipeId: 0,
          currentSetRecipe: {
            recipe
          },
          voteSuccessMessage: '',
          voteFailureMessage: ''
        };
        const action = {
          type: types.VOTE_RECIPE_SUCCESS,
          votes: voteSuccess
        };

        const newState = setCurrentRecipe(currentState, action);
        expect(newState.currentSetRecipeId).toEqual(0);
        expect(newState.currentSetRecipe.recipe.upvotes).toBe(1);
        expect(newState.voteSuccessMessage).toEqual(voteSuccess.message);
        expect(newState.voteFailureMessage).toEqual('');
        done();
      }
    );

    it(
      'should set vote recipe error message when' +
      'passed VOTE_RECIPE_FAILURE',
      (done) => {
        const error = voteMockData.voteFailure404.message;
        const action = {
          type: types.VOTE_RECIPE_FAILURE,
          error
        };

        const newState = setCurrentRecipe(initialState, action);
        expect(newState.currentSetRecipeId).toEqual(0);
        expect(newState.voteSuccessMessage).toEqual('');
        expect(newState.voteFailureMessage).toEqual(action.error);
        done();
      }
    );
  });
});
