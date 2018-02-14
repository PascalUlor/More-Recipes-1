/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { NavBar } from '../../../components/NavBar.jsx';


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

const store = mockStore({});
const shallowWrapper = mount((
  <Provider store={store}>
    <Router><NavBar {...props}/></Router>
  </Provider>
));
window.localStorage = localStorage;
window.localStorage.setItem('jwtToken', 'aygdyusffgyugfufsfsffssffs');

describe('<NavBar/>', () => {
  it('should render without crashing', () => {
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  describe('Test for non authenticated Navbar component', () => {
    it('should render correctly for unauthenticated users', () => {
      expect(shallowWrapper.find('GuestNavBar').length).toBe(1);
    });
  });

  // describe('Test for authenticated Navbar component', () => {
  //   const newProps = {
  //     authenticatedUser: {
  //       isAuthenticated: true,
  //       user: {
  //         id: 1,
  //         username: '',
  //         email: ''
  //       }
  //     },
  //     logOut: jest.fn(),
  //     router: {
  //       history: {
  //         push: jest.fn()
  //       }
  //     }
  //   };
  //   sinon.spy(NavBar.prototype, 'handleLogOut');
  //   it('should render correctly for authenticated users', () => {
  // const verifyTokenObj = {
  //   verifyToken () => 1,
  // };
  // sinon.stub(verifyTokenObj, 'verifyToken');
  //     const shallowWrapper = mount((
  //       <Provider store={store}>
  //         <Router><NavBar {...newProps} /></Router>
  //       </Provider>
  //     ));
  //     expect(shallowWrapper.find('UserNavBar').length).toBe(1);
  //     // console.log(shallowWrapper.html());
  //   });
  // });
  // it('logOut should work correctly', () => {
  //   const logOut = wrapper.find('.btn-default');
  //   logOut.simulate('click', event);
  //   expect(Navbar.prototype.handleLogout.calledOnce).toEqual(true);
  // });
  // });
  // it('should call onChange() event', () => {
  //   mountWrapper.find('SignupForm')
  //     .find('TextFieldGroup').at(0).find('input')
  //     .simulate('change', {
  //       target: {
  //         name: 'fullName',
  //         value: 'Richie Rich',
  //       },
  //     });
  //   expect(mountWrapper.find('SignupPage')
  //     .instance().state.fullName).toEqual('Richie Rich');
  // });
});
