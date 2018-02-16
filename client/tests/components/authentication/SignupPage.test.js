/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { SignupPage } from '../../../components/SignupPage.jsx';


/**
 * @description returns mounted component with its props
 * @function setup
 *
 * @return { object } mounted component
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

    it('should not work for empty input fields', () => {
      signupPage.setState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        repassword: ''
      });
      submit();
      expect(signupPage.state.errors)
        .toEqual({
          fullName: 'Full name is required',
          username: 'Username is required',
          email: 'Email is required',
          password: 'Password is required',
          repassword: 'Password confirmation is required'
        });
      expect(signupPage.props.userSignupRequest).not.toBeCalled();
    });

    it('should not work for invalid username and email', () => {
      signupPage.setState({
        fullName: 'Richie 25 Rich',
        username: '2rich',
        email: 'rich@gmail',
        password: '1234567',
        repassword: '12345678'
      });
      submit();
      expect(signupPage.state.errors)
        .toEqual({
          fullName: 'Full name must contain only alphabets',
          username: 'Username must not start with number(s)',
          email: 'Email is invalid',
          password: 'Password length must be between 8 and 30',
          repassword: 'Password mismatched'
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
