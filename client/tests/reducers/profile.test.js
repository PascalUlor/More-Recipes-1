import profile from '../../reducers/profile';
import * as types from '../../actions/actionTypes/actionTypes';
import mockData from '../__mocks__/data/userData';

describe('Post Review Reducer', () => {
  const initialState = {
    isProfileFetching: false,
    fetchedProfile: {},
    fetchProfileError: '',
    isProfileUpdating: false,
    updatedProfile: {},
    updateProfileError: ''
  };

  it('should return proper initial state', (done) => {
    expect(profile(undefined, {})).toEqual(initialState);
    done();
  });

  it(
    'should set profile loader to true when passed IS_PROFILE_FETCHING',
    (done) => {
      const action = {
        type: types.IS_PROFILE_FETCHING,
        bool: true
      };

      const newState = profile(initialState, action);
      expect(newState.isProfileFetching).toEqual(action.bool);
      expect(newState.fetchedProfile).toEqual({});
      expect(newState.fetchProfileError).toEqual('');
      done();
    }
  );
  it(
    'should set post review error messsage when passed FETCH_PROFILE_SUCCESS',
    (done) => {
      const action = {
        type: types.FETCH_PROFILE_SUCCESS,
        fetchedProfile: mockData.getProfileResponse
      };

      const newState = profile(initialState, action);
      expect(newState.isProfileUpdating).toEqual(false);
      expect(newState.fetchedProfile).toEqual(mockData.getProfileResponse);
      expect(newState.fetchProfileError).toEqual('');
      done();
    }
  );
  it(
    'should set post review error messsage when passed FETCH_PROFILE_SUCCESS',
    (done) => {
      const action = {
        type: types.FETCH_PROFILE_FAILURE,
        error: 'Internal server error'
      };

      const newState = profile(initialState, action);
      expect(newState.isProfileFetching).toEqual(false);
      expect(newState.fetchedProfile).toEqual({});
      expect(newState.fetchProfileError).toEqual(action.error);
      done();
    }
  );
  it(
    'should set post review error messsage when passed IS_PROFILE_UPDATING',
    (done) => {
      const action = {
        type: types.IS_PROFILE_UPDATING,
        bool: true
      };

      const newState = profile(initialState, action);
      expect(newState.isProfileUpdating).toEqual(action.bool);
      expect(newState.updatedProfile).toEqual({});
      expect(newState.updateProfileError).toEqual('');
      done();
    }
  );
  it(
    'should set post review error messsage when passed PROFILE_UPDATE_SUCCESS',
    (done) => {
      const action = {
        type: types.PROFILE_UPDATE_SUCCESS,
        updatedProfile: mockData.updateResponse
      };

      const newState = profile(initialState, action);
      expect(newState.isProfileUpdating).toEqual(false);
      expect(newState.updatedProfile).toEqual(action.updatedProfile);
      expect(newState.updateProfileError).toEqual('');
      done();
    }
  );
  it(
    'should set post review error messsage when passed PROFILE_UPDATE_FAILURE',
    (done) => {
      const action = {
        type: types.PROFILE_UPDATE_FAILURE,
        error: 'Internal server error'
      };

      const newState = profile(initialState, action);
      expect(newState.isProfileUpdating).toEqual(false);
      expect(newState.updatedProfile).toEqual({});
      expect(newState.updateProfileError).toEqual(action.error);
      done();
    }
  );
});
