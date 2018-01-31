import axios from 'axios';
import {
  IS_PROFILE_FETCHING,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  IS_PROFILE_UPDATING,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE
}
from '../actionTypes/actionTypes';


/**
 * @description handles fetch user profile loader
 *
 * @param { boolean } bool - contains user profile fetching state boolean
 *
 * @returns { object } loader - returns fetch user profile loader action
 */
const isProfileFetching = bool => ({
  type: IS_PROFILE_FETCHING,
  bool
});

/**
 * @description handles fetch user profile success
 *
 * @param { object } fetchedProfile - contains object of user profile details
 *
 * @returns { object } profile success - returns profile success action
 */
const fetchProfileSuccess = fetchedProfile => ({
  type: FETCH_PROFILE_SUCCESS,
  fetchedProfile
});

/**
 * @description handles fetch user profile failure
 *
 * @param { string } error - contains message of user profile failure
 *
 * @returns { object } profile failure - returns profile failure action
 */
const fetchProfileFailure = error => ({
  type: FETCH_PROFILE_FAILURE,
  error
});

/**
 * @description handles update user profile loader
 *
 * @param { boolean } bool - contains user profile updating state boolean
 *
 * @returns { object } loader - returns update user profile loader action
 */
const isProfileUpdating = bool => ({
  type: IS_PROFILE_UPDATING,
  bool
});

/**
 * @description handles update user profile success
 *
 * @param { object } updatedProfile - contains object of user updated profile
 *
 * @returns { object } update success - returns profile update success action
 */
const profileUpdateSuccess = updatedProfile => ({
  type: PROFILE_UPDATE_SUCCESS,
  updatedProfile
});

/**
 * @description handles update user profile failure
 *
 * @param { string } error - contains message of user update profile failure
 *
 * @returns { object } update failure - returns profile update failure action
 */
const profileUpdateFailure = error => ({
  type: PROFILE_UPDATE_FAILURE,
  error
});

/**
 * @description handles fetch user profile request
 *
 * @returns { object } fetched profile/error - returns fetch user profile action
 */
export const fetchProfileRequest = () => (
  (dispatch) => {
    dispatch(isProfileFetching(true));
    return axios({
        method: 'GET',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        url: '/api/v1/user/profile'
      })
      .then((response) => {
        dispatch(fetchProfileSuccess(response.data));
        dispatch(isProfileFetching(false));
      })
      .catch((error) => {
        dispatch(fetchProfileFailure(error));
        dispatch(isProfileFetching(false));
      });
  }
);

/**
 * @description handles user profile update
 *
 * @param { object } userDetails - contains object of user details
 * @param { string } cloudImageUrl - contains string of uploaded profile image
 *
 * @returns { object } created recipe - returns update user profile action
 */
const updateProfile = (userDetails, cloudImageUrl) => (
  (dispatch) => {
    if (axios.defaults.headers.common['x-access-token'] === '') {
      axios.defaults.headers.common['x-access-token'] = window.localStorage.jwtToken;
    }
    return axios({
        method: 'PUT',
        url: '/api/v1/user/profile',
        headers: {
          'x-access-token': window.localStorage.jwtToken
        },
        data: {
          fullName: userDetails.fullName,
          username: userDetails.username,
          email: userDetails.email,
          profileImage: cloudImageUrl,
          location: userDetails.location,
          aboutMe: userDetails.aboutMe
        }
      })
      .then((response) => {
        if (response) {
          dispatch(profileUpdateSuccess(response.data));
          dispatch(isProfileUpdating(false));
        }
      })
      .catch(() => {
        dispatch(profileUpdateFailure('Unable to update your profile. Try again later'));
        dispatch(isProfileUpdating(false));
      });
  }
);

/**
 * @description handles update user profile request
 *
 * @param { object } userDetails - contains object of user details
 *
 * @returns { function } update profile action - returns update profile action
 */
export const updateProfileRequest = userDetails => (
  (dispatch) => {
    let cloudImageUrl = '';
    dispatch(isProfileUpdating(true));
    if (userDetails.imageFile.name) {
      delete axios.defaults.headers.common['x-access-token'];
      const imageData = new FormData();
      imageData.append('file', userDetails.imageFile);
      imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      return axios.post(process.env.CLOUDINARY_URL, imageData)
        .then((response) => {
          cloudImageUrl = response.data.url;
          dispatch(updateProfile(userDetails, cloudImageUrl));
        })
        .catch(() => {
          dispatch(profileUpdateFailure('Unable to update your profile. Try again later'));
          dispatch(isProfileUpdating(false));
        });
    }
    return dispatch(updateProfile(userDetails, cloudImageUrl));
  }
);
