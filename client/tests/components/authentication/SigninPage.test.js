/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { SigninPage } from '../../../components/SigninPage.jsx';


/**
 * @param { boolean } loading
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    isAuthenticated: false,
    flashMessage: {},
    addFlashMessage: jest.fn(),
    userSigninRequest: jest.fn(() => Promise.resolve()),
    history: {
      push: () => {}
    }
  };
  const store = mockStore({});
  return mount((
    <Provider store={store}>
      <Router><SigninPage {...props}/></Router>
    </Provider>
  ));
};

describe('<SigninPage/>', () => {
  const mountWrapper = setup();
  it('should render without crashing', () => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('should call onChange() event', () => {
    mountWrapper.find('SigninForm')
      .find('TextFieldGroup').at(0).find('input')
      .simulate('change', {
        target: {
          name: 'username',
          value: 'rich',
        },
      });
    expect(mountWrapper.find('SigninPage')
      .instance().state.username).toEqual('rich');
  });

  it('should call onFocus() event', () => {
    mountWrapper.find('SigninForm')
      .find('TextFieldGroup').at(0).find('input')
      .simulate('focus');
  });

  describe('handleSubmit()', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const signinPage = mountWrapper.find('SigninPage').instance();
    const submit = () => mountWrapper.find('SigninForm')
      .find('TextFieldGroup').at(0).find('input')
      .simulate('submit', event);
    it('should not work for empty username', () => {
      signinPage.setState({
        username: '',
        password: ''
      });
      submit();
      expect(signinPage.state.errors)
        .toEqual({
          username: 'Username is required',
          password: 'Password is required'
        });
      expect(signinPage.props.userSigninRequest).not.toBeCalled();
    });

    it('should work if provided form details are valid', () => {
      signinPage.setState({
        username: 'rich',
        password: '12345678'
      });
      submit();
      expect(signinPage.state.errors).toEqual({});
      expect(signinPage.props.userSigninRequest).toBeCalled();
    });
  });
});
