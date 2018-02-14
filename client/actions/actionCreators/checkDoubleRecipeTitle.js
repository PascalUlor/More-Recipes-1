import axios from 'axios';
import {
  IS_RECIPE_TITLE_DOUBLE,
  DOUBLE_RECIPE_TITLE_ERROR
} from '../actionTypes/actionTypes';

/**
 * @description handles check for double recipe title
 *
 * @param { boolean } bool - contains double recipe title state boolean
 *
 * @returns { object } double recipe loader - returns double recipe title action
 */
const isRecipeTitleDouble = bool => ({
  type: IS_RECIPE_TITLE_DOUBLE,
  bool
});

/**
 * @description handles check for double recipe title
 *
 * @param { string } error - contains error message
 *
 * @returns { object } error message - returns double recipe title error action
 */
const doubleRecipeTitleError = error => ({
  type: DOUBLE_RECIPE_TITLE_ERROR,
  error
});

/**
 * @description handles check for double recipe title
 *
 * @param { string } recipeTitle - contains title of the recipe
 *
 * @returns { object } success or error - returns double recipe title action
 */
const checkDoubleRecipeTitleRequest = recipeTitle => (
  dispatch => (
    axios({
      method: 'POST',
      headers: {
        'x-access-token': window.localStorage.jwtToken
      },
      url: '/api/v1/recipes/checkTitle',
      data: { title: recipeTitle }
    }).then(() => {
      dispatch(isRecipeTitleDouble(false));
      dispatch(doubleRecipeTitleError(''));
    }).catch((error) => {
      dispatch(isRecipeTitleDouble(true));
      dispatch(doubleRecipeTitleError(error.response.data.message));
    })
  )
);

export default checkDoubleRecipeTitleRequest;
