import { Reducer } from 'redux-testkit';
import authReducer from '../../reducers/authenticatedUser';
import * as types from '../../actions/actionTypes/actionTypes';
import mockData from '../__mocks__/data/userData';

describe('Authentication Reducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: {}
  };

  it('should return proper initial state', (done) => {
    expect(authReducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('should not affect state', () => {
    Reducer(authReducer).expect({ type: 'NOT_EXISTING' })
      .toReturnState(initialState);
  });

  it('should set the current user when passed SET_CURRENT_USER', (done) => {
    const user = mockData.signUpData;

    const action = {
      type: types.SET_CURRENT_USER,
      user
    };

    const newState = authReducer(initialState, action);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user.username).toEqual('johndoe');
    expect(newState.user.email).toEqual('johndoe@domain.com');
    done();
  });

  it('should update profile when passed UPDATE_PROFILE_SUCCESS', (done) => {
    const updatedProfile = mockData.updateResponse;
    const action = {
      type: types.PROFILE_UPDATE_SUCCESS,
      updatedProfile
    };

    const newState = authReducer({}, action);
    expect(newState.user.username).toEqual('johnny');
    done();
  });
});
