import isEmpty from 'lodash/isEmpty';
import {
  SET_CURRENT_USER,
  PROFILE_UPDATE_SUCCESS
} from '../actions/actionTypes/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

/**
 * @description holds authentication check and current user state
 * @function
 *
 * @param { object } state - contains reducer initial state
 * @param { object } action - contains actions to be performed
 *
 * @returns { object } the new user state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      });
    case PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          username: action.updatedProfile.updatedUser.username
        })
      });
    default:
      return state;
  }
};
