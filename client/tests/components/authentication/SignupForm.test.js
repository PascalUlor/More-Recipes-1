/* eslint-disable */
import React from 'react';
import Spinner from 'react-md-spinner';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupForm from '../../../components/signupPage/SignupForm.jsx';

/**
 * @description return initial property state of the component instance
 * @function setup
 *
 * @return { object } props - properties of component instance
 */
const setup = () => {
  const props = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    repassword: '',
    errors: {},
    isLoading: false,
    handleChange: jest.fn(),
    handleFocus: jest.fn(),
    handleSubmit: jest.fn()
  };
  return props;
};

const props = setup();
describe('<SignupForm/>', () => {
  it('renders form with five input fields and a button', () => {
    const wrapper = shallow(<SignupForm {...props}/>);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextFieldGroup').length).toBe(5);
    expect(wrapper.find('button').length).toBe(1);
  });
  it('renders Spinner component, when isLoading is ', () => {
    const wrapper =
    mount(<Router><SignupForm {...props} isLoading={true}/></Router>);
    expect(wrapper.find(Spinner).length).toEqual(1);
  });
});
