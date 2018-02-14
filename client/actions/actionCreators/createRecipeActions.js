import axios from 'axios';
import {
  IS_RECIPE_CREATING,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE
} from '../actionTypes/actionTypes';

/**
 * @description handles recipe creation loading
 *
 * @param { boolean } bool - contains recipe creating state boolean
 *
 * @returns { object } create recipe loader - returns create recipe action
 */
const isRecipeCreating = bool => ({
  type: IS_RECIPE_CREATING,
  bool
});

/**
 * @description handles create recipe success
 *
 * @param { object } createdRecipe - contains object of created recipe
 * @param { string } message - contains success message
 *
 * @returns { object } created recipe - returns create recipe success action
 */
const createRecipeSuccess = (createdRecipe, message) => ({
  type: CREATE_RECIPE_SUCCESS,
  createdRecipe,
  message
});

/**
 * @description handles create recipe failure
 *
 * @param { string } error - contains failure message
 *
 * @returns { object } failure object - returns create recipe failure action
 */
const createRecipeFailure = error => ({
  type: CREATE_RECIPE_FAILURE,
  error
});

/**
 * @description handles recipe creation
 *
 * @param { object } recipe - contains object of recipe details
 * @param { string } cloudImageUrl - contains string of uploaded image
 *
 * @returns { object } created recipe - returns created recipe action
 */
const createRecipe = (recipe, cloudImageUrl) => (
  (dispatch) => {
    if (axios.defaults.headers.common['x-access-token'] === '') {
      axios.defaults.headers.common['x-access-token'] = window.localStorage.jwtToken;
    }

    return axios({
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
      const { message } = response.data;
      dispatch(createRecipeSuccess(response.data.recipe, message));
      dispatch(isRecipeCreating(false));
    }).catch((error) => {
      dispatch(createRecipeFailure(error.response.data.message));
      dispatch(isRecipeCreating(false));
    });
  }
);

/**
 * @description handles recipe creation request
 *
 * @param { object } recipe - contains object of recipe details
 *
 * @returns { function } create recipe action - returns created recipe action
 */
const createRecipeRequest = recipe => (
  (dispatch) => {
    let cloudImageUrl = process.env.DEFAULT_IMAGE_URL;

    dispatch(isRecipeCreating(true));
    if (recipe.imageFile.name) {
      delete axios.defaults.headers.common['x-access-token'];
      const imageData = new FormData();
      imageData.append('file', recipe.imageFile);
      imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      return axios.post(process.env.CLOUDINARY_URL, imageData)
        .then((response) => {
          cloudImageUrl = response.data.url;
          return dispatch(createRecipe(recipe, cloudImageUrl));
        }).catch(() => {
          dispatch(createRecipeFailure('Upload failed. Try again later'));
          dispatch(isRecipeCreating(false));
        });
    }
    return dispatch(createRecipe(recipe, cloudImageUrl));
  }
);

export default createRecipeRequest;
