import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setAuthorizationToken } from '../../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from '../actionTypes/actionTypes';

/**
 * @description handles setting current logged-in user
 *
 * @param { object } user - contains object of logged-in user details
 *
 * @returns { object } user details - returns details of current logged-in user
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * @description handles user sign in
 *
 * @param { object } userData - contains object of logged-in user details
 *
 * @returns { object } user details - returns user signin action
 */
const userSigninRequest = userData => (
  dispatch => (
    axios.post('/api/v1/users/signin', userData)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
  )
);

export default userSigninRequest;
