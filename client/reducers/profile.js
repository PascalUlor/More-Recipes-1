import {
  IS_PROFILE_FETCHING,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  IS_PROFILE_UPDATING,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE
}
from '../actions/actionTypes/actionTypes';

const initialState = {
  isProfileFetching: false,
  fetchedProfile: {},
  fetchProfileError: '',
  isProfileUpdating: false,
  updatedProfile: {},
  updateProfileError: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_PROFILE_FETCHING:
      return Object.assign({}, state, { isProfileFetching: action.bool });
    case FETCH_PROFILE_SUCCESS:
      return Object.assign({}, state, { fetchedProfile: action.fetchedProfile });
    case FETCH_PROFILE_FAILURE:
      return Object.assign({}, state, { fetchProfileError: action.error });
    case IS_PROFILE_UPDATING:
      return Object.assign({}, state, { isProfileUpdating: action.bool });
    case PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, { updatedProfile: action.updatedProfile });
    case PROFILE_UPDATE_FAILURE:
      return Object.assign({}, state, { updateProfileError: action.error });
    default:
      return state;
  }
};
