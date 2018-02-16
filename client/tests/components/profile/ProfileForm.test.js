/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import Spinner from 'react-md-spinner';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileForm from '../../../components/profile/ProfileForm.jsx';

/**
 * @description return initial property state of the component instance
 * @function setup
 *
 * @return { object } props - properties of component instance
 */
const setup = () => {
  const props = {
    profile: {
      fullName: '',
      username: '',
      email: '',
      profileImage: '',
      location: '',
      aboutMe: '',
      errors: {},
    },
    isUpdating: false,
    handleChange: jest.fn(),
    handleFocus: jest.fn(),
    handleClick: jest.fn(),
    handleImageChange: jest.fn(),
    handleSubmit: jest.fn()
  };
  return props;
};

const props = setup();
describe('ProfileForm component', () => {

  it('renders form with five input fields and a button', () => {
    const shallowWrapper = shallow(<ProfileForm {...props}/>);
    expect(shallowWrapper.find('div').length).toBe(5);
    expect(shallowWrapper.find('form').length).toBe(1);
    expect(shallowWrapper.find('TextFieldGroup').length).toBe(4);
    expect(shallowWrapper.find('button').length).toBe(1);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders Spinner component, when isLoading is true', () => {
    const mountWrapper =
    mount(<Router><ProfileForm {...props} isUpdating={true}/></Router>);
    expect(mountWrapper.find(Spinner).length).toEqual(1);
  });
});
