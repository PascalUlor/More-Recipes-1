/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { Profile } from '../../../components/Profile.jsx';


/**
 * @param { boolean } loading
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    fetchProfile: jest.fn(),
    updateProfile: jest.fn(),
    isFetching: false,
    fetchedProfile: {},
    isProfileUpdating: false,
    updatedProfile: {},
    updateProfileError: ''
  };
  const store = mockStore({});
  return shallow((
    <Provider store={store}>
      <Router><Profile {...props}/></Router>
    </Provider>
  ));
};

describe('Profile component', () => {
  const mountWrapper = setup();
  it('should render correctly', () => {
    expect(mountWrapper).toMatchSnapshot();
  });
});
