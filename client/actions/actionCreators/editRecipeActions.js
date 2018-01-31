import axios from 'axios';
import {
  IS_RECIPE_UPDATING,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_FAILURE
} from '../actionTypes/actionTypes';

/**
 * @description handles update user recipe loader
 *
 * @param { boolean } bool - contains recipe updating state boolean
 *
 * @returns { object } loader - returns update recipe loader action
 */
const isRecipeUpdating = bool => ({
  type: IS_RECIPE_UPDATING,
  bool
});

/**
 * @description handles update user recipe success
 *
 * @param { object } updatedRecipe - contains object of recipe been updated
 * @param { string } message - contains update success message
 *
 * @returns { object } updated recipe - returns updated recipe success action
 */
const updateRecipeSuccess = (updatedRecipe, message) => ({
  type: UPDATE_RECIPE_SUCCESS,
  updatedRecipe,
  message
});

/**
 * @description handles update user recipe failure
 *
 * @param { string } error - contains update recipe failure message
 *
 * @returns { object } updated recipe - returns update recipe faiolure action
 */
const updateRecipeFailure = error => ({
  type: UPDATE_RECIPE_FAILURE,
  error
});

/**
 * @description handles recipe updating
 *
 * @param { object } recipe - contains object of recipe details
 * @param { string } cloudImageUrl - contains string of uploaded image
 *
 * @returns { object } updated recipe - returns update recipe action
 */
const updateRecipe = (recipe, cloudImageUrl) => (
  (dispatch) => {
    if (axios.defaults.headers.common['x-access-token'] === '') {
      axios.defaults.headers.common['x-access-token'] = window.localStorage.jwtToken;
    }

    return axios({
      method: 'PUT',
      url: `/api/v1/recipes/${recipe.id}`,
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
        const { message } = response.data;
        dispatch(updateRecipeSuccess(response.data.recipe, message));
        dispatch(isRecipeUpdating(false));
      }
    }).catch((error) => {
      dispatch(updateRecipeFailure(error.response.data.message));
      dispatch(isRecipeUpdating(false));
    });
  }
);

/**
 * @description handles recipe updating request
 *
 * @param { object } recipe - contains object of recipe details
 *
 * @returns { function } update recipe action - returns update recipe action
 */
const updateRecipeRequest = recipe => (
  (dispatch) => {
    let cloudImageUrl = recipe.initialImageSrc;
    dispatch(isRecipeUpdating(true));

    if (recipe.imageFile.name) {
      delete axios.defaults.headers.common['x-access-token'];
      const imageData = new FormData();
      imageData.append('file', recipe.imageFile);
      imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      return axios.post(process.env.CLOUDINARY_URL, imageData)
        .then((response) => {
          cloudImageUrl = response.data.url;
          return dispatch(updateRecipe(recipe, cloudImageUrl));
        }).catch(() => {
          dispatch(isRecipeUpdating(false));
          dispatch(updateRecipeFailure('Upload failure. Try again later'));
        });
    }
    return dispatch(updateRecipe(recipe, cloudImageUrl));
  }
);

export default updateRecipeRequest;
