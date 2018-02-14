/* eslint-disable */
import signUp from '../../actions/actionCreators/signupActions';
import signIn from '../../actions/actionCreators/signinActions';
import logout from '../../actions/actionCreators/logOutActions';
import {
  fetchProfileRequest,
  updateProfileRequest
} from '../../actions/actionCreators/profileActions';
import * as types from '../../actions/actionTypes/actionTypes';
import mockData from '../__mocks__/data/userData';


describe('user actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('authentication actions', () => {
    it('should sign up a new user', (done) => {
      const { signUpData, signUpResponse } = mockData;
      moxios.stubRequest('/api/v1/users/signup', {
        status: 201,
        response: signUpResponse
      });
      const { id, username, email } = signUpResponse.user;
      const user = { id, username, email };
      const expectedActions = [{
        type: types.SET_CURRENT_USER,
        user
      }];
      const store = mockStore({});
      return store.dispatch(signUp(signUpData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should sign in a user', (done) => {
      const { signInData, signInResponse } = mockData;
      moxios.stubRequest('/api/v1/users/signin', {
        status: 200,
        response: signInResponse
      });
      const { id, username, email } = signInResponse.user;
      const user = { id, username, email };
      const expectedActions = [{
        type: types.SET_CURRENT_USER,
        user
      }];
      const store = mockStore({});
      return store.dispatch(signIn(signInData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should sign out a user', function async(done) {
      const expectedActions = [{
        type: types.SET_CURRENT_USER,
        user: {}
      }];
      const store = mockStore({});
      store.dispatch(logout());

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('profile actions', () => {
    it('should get a users profile details', (done) => {
      const { getProfileResponse } = mockData;
      moxios.stubRequest('/api/v1/user/profile', {
        status: 200,
        response: getProfileResponse
      });

      const expectedActions = [
        { type: types.IS_PROFILE_FETCHING, bool: true },
        { type: types.FETCH_PROFILE_SUCCESS, fetchedProfile: getProfileResponse },
        { type: types.IS_PROFILE_FETCHING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchProfileRequest())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('catches an error for getting a user profile details', (done) => {
      const { profileError } = mockData;
      moxios.stubRequest('/api/v1/user/profile', {
        status: 500,
        response: profileError
      });

      const expectedActions = [
        { type: types.IS_PROFILE_FETCHING, bool: true },
        { type: types.FETCH_PROFILE_FAILURE, error: profileError.message },
        { type: types.IS_PROFILE_FETCHING, bool: false },
      ];
      const store = mockStore({});
      return store.dispatch(fetchProfileRequest())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should update a user profile details', (done) => {
      const { updateData, updateResponse } = mockData;
      moxios.stubRequest('/api/v1/user/profile', {
        status: 200,
        response: updateResponse
      });

      const expectedActions = [
        { type: types.IS_PROFILE_UPDATING, bool: true },
        { type: types.PROFILE_UPDATE_SUCCESS, updatedProfile: updateResponse },
        { type: types.IS_PROFILE_UPDATING, bool: false },
      ];
      const store = mockStore({});
      return store.dispatch(updateProfileRequest(updateData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('catches an error for updating a user details', (done) => {
      const { updateData, profileError } = mockData;
      moxios.stubRequest('/api/v1/user/profile', {
        status: 500,
        response: profileError
      });

      const expectedActions = [
        { type: types.IS_PROFILE_UPDATING, bool: true },
        {
          type: types.PROFILE_UPDATE_FAILURE,
          error: profileError.message
        },
        { type: types.IS_PROFILE_UPDATING, bool: false }
      ];
      const store = mockStore({});
      return store.dispatch(updateProfileRequest(updateData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
