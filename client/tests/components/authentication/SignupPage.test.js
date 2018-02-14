/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { SignupPage } from '../../../components/SignupPage.jsx';


/**
 * @param { boolean } loading
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    addFlashMessage: jest.fn(),
    userSignupRequest: jest.fn(() => Promise.resolve()),
    history: {
      push: jest.fn()
    }
  };
  const store = mockStore({});
  return mount((
    <Provider store={store}>
      <Router><SignupPage {...props}/></Router>
    </Provider>
  ));
};

describe('<SignupPage/>', () => {
  const mountWrapper = setup();
  it('should render without crashing', () => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('should call onChange() event', () => {
    mountWrapper.find('SignupForm')
      .find('TextFieldGroup').at(0).find('input')
      .simulate('change', {
        target: {
          name: 'fullName',
          value: 'Richie Rich',
        },
      });
    expect(mountWrapper.find('SignupPage')
      .instance().state.fullName).toEqual('Richie Rich');
  });

  it('should call onFocus() event', () => {
    mountWrapper.find('SignupForm')
      .find('TextFieldGroup').at(0).find('input')
      .simulate('focus');
  });

  describe('handleSubmit()', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const signupPage = mountWrapper.find('SignupPage').instance();
    const submit = () => mountWrapper.find('SignupForm')
      .find('TextFieldGroup').at(0).find('input')
      .simulate('submit', event);
    it('should not work for invalid username and email', () => {
      signupPage.setState({
        fullName: 'Richie Rich',
        username: '2rich',
        email: 'rich@gmail',
        password: '12345678',
        repassword: '12345678'
      });
      submit();
      expect(signupPage.state.errors)
        .toEqual({
          username: 'Username must not start with number(s)',
          email: 'Email is invalid'
        });
      expect(signupPage.props.userSignupRequest).not.toBeCalled();
    });

    it('should work if provided form details are valid', () => {
      signupPage.setState({
        fullName: 'Richie Rich',
        username: 'rich',
        email: 'rich@gmail.com',
        password: '12345678',
        repassword: '12345678'
      });
      submit();
      expect(signupPage.state.errors).toEqual({});
      expect(signupPage.props.userSignupRequest).toBeCalled();
    });
  });
});
