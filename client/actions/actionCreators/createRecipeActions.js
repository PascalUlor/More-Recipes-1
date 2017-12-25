import axios from 'axios';
import {
  IS_RECIPE_TITLE_DOUBLE,
  DOUBLE_RECIPE_TITLE_ERROR,
  IS_RECIPE_CREATING,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE
}
from '../actionTypes/actionTypes';
import { fetchRecipesRequest } from './getUserRecipesActions';


const isRecipeTitleDouble = bool => ({
  type: IS_RECIPE_TITLE_DOUBLE,
  bool
});

const doubleRecipeTitleError = error => ({
  type: DOUBLE_RECIPE_TITLE_ERROR,
  error
});

const isRecipeCreating = bool => ({
  type: IS_RECIPE_CREATING,
  bool
});

const createRecipeSuccess = createdRecipe => ({
  type: CREATE_RECIPE_SUCCESS,
  createdRecipe
});

const createRecipeFailure = error => ({
  type: CREATE_RECIPE_FAILURE,
  error
});

export const doubleRecipeTitleCheck = recipeTitle => (
  dispatch =>
  axios({
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.jwtToken
    },
    url: '/api/v1/recipes/checkTitle',
    data: { title: recipeTitle }
  })
  .then((response) => {
    if (response.data.status === 'Failed') {
      dispatch(isRecipeTitleDouble(true));
      dispatch(doubleRecipeTitleError(response.data.message));
    } else {
      dispatch(isRecipeTitleDouble(false));
      dispatch(doubleRecipeTitleError(''));
    }
  }).catch(error => console.log('error block: >>>', error))
);

export const createRecipe = (recipe, cloudImageUrl, callback) => (
  (dispatch) => {
    if (axios.defaults.headers.common['x-access-token'] === '') {
      axios.defaults.headers.common['x-access-token'] = window.localStorage.jwtToken;
    }

    axios({
      method: 'POST',
      url: '/api/v1/recipes',
      headers: {
        'x-access-token': window.localStorage.jwtToken
      },
      data: {
        title: recipe.title,
        ingredients: recipe.ingredients,
        procedures: recipe.procedures,
        recipeImage: cloudImageUrl
      }
    }).then((response) => {
      if (response) {
        dispatch(createRecipeSuccess(response.data));
        dispatch(isRecipeCreating(false));
        callback();
        dispatch(fetchRecipesRequest());
      }
    }).catch(() => {
      dispatch(createRecipeFailure('Unable to upload your recipe. Try again later'));
      dispatch(isRecipeCreating(false));
      callback();
    });
  }
);

export const createRecipeRequest = (recipe, callback) => (
  (dispatch) => {
    let cloudImageUrl = process.env.DEFAULT_IMAGE_URL;

    dispatch(isRecipeCreating(true));
    if (recipe.imageFile.name) {
      delete axios.defaults.headers.common['x-access-token'];
      const imageData = new FormData();
      imageData.append('file', recipe.imageFile);
      imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      axios.post(process.env.CLOUDINARY_URL, imageData)
        .then((response) => {
          cloudImageUrl = response.data.url;
          dispatch(createRecipe(recipe, cloudImageUrl, callback));
        }).catch(() => {
          dispatch(isRecipeCreating(false));
          dispatch(createRecipeFailure('Unable to upload your recipe. Try again later'));
          callback();
        });
    } else {
      dispatch(createRecipe(recipe, cloudImageUrl, callback));
    }
  }
);
