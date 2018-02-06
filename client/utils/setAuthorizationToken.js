import axios from 'axios';

/**
 * @description set authorization token after sign in, sign up or logout
 * @function
 *
 * @returns { * } null
 */
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};
