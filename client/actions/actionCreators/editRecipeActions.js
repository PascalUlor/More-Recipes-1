import axios from 'axios';
import {
  IS_RECIPE_UPDATING,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_FAILURE
} from '../actionTypes/actionTypes';
import { fetchRecipesRequest } from './getUserRecipesActions';

const isRecipeUpdating = bool => ({
  type: IS_RECIPE_UPDATING,
  bool
});

const updateRecipeSuccess = message => ({
  type: UPDATE_RECIPE_SUCCESS,
  message
});

const updateRecipeFailure = error => ({
  type: UPDATE_RECIPE_FAILURE,
  error
});

const updateRecipe = (recipe, cloudImageUrl, callback) => (
  (dispatch) => {
    if (axios.defaults.headers.common['x-access-token'] === '') {
      axios.defaults.headers.common['x-access-token'] = window.localStorage.jwtToken;
    }

    axios({
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
        dispatch(updateRecipeSuccess(response.data.message));
        dispatch(isRecipeUpdating(false));
        callback();
        dispatch(fetchRecipesRequest());
      }
    }).catch(() => {
      dispatch(updateRecipeFailure('Unable to upload your recipe. Try again later'));
      dispatch(isRecipeUpdating(false));
      callback();
    });
  }
);

const updateRecipeRequest = (recipe, callback) => (
  (dispatch) => {
    let cloudImageUrl = recipe.initialImageSrc;
    dispatch(isRecipeUpdating(true));

    if (recipe.imageFile.name) {
      delete axios.defaults.headers.common['x-access-token'];
      const imageData = new FormData();
      imageData.append('file', recipe.imageFile);
      imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      axios.post(process.env.CLOUDINARY_URL, imageData)
        .then((response) => {
          cloudImageUrl = response.data.url;
          dispatch(updateRecipe(recipe, cloudImageUrl, callback));
        }).catch(() => {
          dispatch(isRecipeUpdating(false));
          dispatch(updateRecipeFailure('Unable to upload your recipe. Try again later'));
          callback();
        });
    } else {
      dispatch(updateRecipe(recipe, cloudImageUrl, callback));
    }
  }
);

export default updateRecipeRequest;
