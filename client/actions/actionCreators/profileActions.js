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

const isProfileFetching = bool => ({
  type: IS_PROFILE_FETCHING,
  bool
});

const fetchProfileSuccess = fetchedProfile => ({
  type: FETCH_PROFILE_SUCCESS,
  fetchedProfile
});

const fetchProfileFailure = error => ({
  type: FETCH_PROFILE_FAILURE,
  error
});

const isProfileUpdating = bool => ({
  type: IS_PROFILE_UPDATING,
  bool
});

const profileUpdateSuccess = updatedProfile => ({
  type: PROFILE_UPDATE_SUCCESS,
  updatedProfile
});

const profileUpdateFailure = error => ({
  type: PROFILE_UPDATE_FAILURE,
  error
});

export const fetchProfile = () => (
  (dispatch) => {
    dispatch(isProfileFetching(true));
    axios({
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

const updateProfile = (userDetails, cloudImageUrl, callback) => (
  (dispatch) => {
    if (axios.defaults.headers.common['x-access-token'] === '') {
      axios.defaults.headers.common['x-access-token'] = window.localStorage.jwtToken;
    }
    axios({
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
    }).then((response) => {
      if (response) {
        dispatch(profileUpdateSuccess(response.data));
        dispatch(isProfileUpdating(false));
        callback();
      }
    }).catch(() => {
      dispatch(profileUpdateFailure('Unable to update your profile. Try again later'));
      dispatch(isProfileUpdating(false));
      callback();
    });
  }
);

export const updateProfileRequest = (userDetails, callback) => (
  (dispatch) => {
    let cloudImageUrl = '';
    dispatch(isProfileUpdating(true));
    if (userDetails.imageFile.name) {
      delete axios.defaults.headers.common['x-access-token'];
      const imageData = new FormData();
      imageData.append('file', userDetails.imageFile);
      imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      axios.post(process.env.CLOUDINARY_URL, imageData)
        .then((response) => {
          cloudImageUrl = response.data.url;
          dispatch(updateProfile(userDetails, cloudImageUrl, callback));
        }).catch(() => {
          dispatch(profileUpdateFailure('Unable to update your profile. Try again later'));
          dispatch(isProfileUpdating(false));
          callback();
        });
    } else {
      dispatch(updateProfile(userDetails, cloudImageUrl, callback));
    }
  }
);
