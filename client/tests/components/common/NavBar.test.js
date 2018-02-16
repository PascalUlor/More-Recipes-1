/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import NavBar from '../../../components/NavBar.jsx';
import store from '../../../store';


const props = {
  authenticatedUser: {
    isAuthenticated: false,
    user: {}
  },
  logOut: jest.fn(),
  router: {
    history: {
      push: jest.fn()
    }
  }
};

describe('<NavBar/>', () => {
  const mountWrapper = mount((
    <Provider store={store}>
      <Router><NavBar {...props}/></Router>
    </Provider>
  ));

  it('should render without crashing', (done) => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
    done();
  });

  it('should render correctly for unauthenticated users', (done) => {
    expect(mountWrapper.find('GuestNavBar').length).toBe(1);
    done();
  });
});
