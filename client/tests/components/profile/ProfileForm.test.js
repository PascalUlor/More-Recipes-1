/* eslint-disable */
import React from 'react';
import Spinner from 'react-md-spinner';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileForm from '../../../components/profile/ProfileForm.jsx';

/**
 *
 * @return { object } props
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
    handleChange: () => {},
    handleFocus: () => {},
    handleClick: () => {},
    handleImageChange: () => {},
    handleSubmit: () => {}
  };
  return props;
};

const props = setup();
describe('<SignupForm/>', () => {
  it('renders form with five input fields and a button', () => {
    const wrapper = shallow(<ProfileForm {...props}/>);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextFieldGroup').length).toBe(4);
    expect(wrapper.find('button').length).toBe(1);
  });
  it('renders Spinner component, when isLoading is true', () => {
    const wrapper =
    mount(<Router><ProfileForm {...props} isUpdating={true}/></Router>);
    expect(wrapper.find(Spinner).length).toEqual(1);
  });
});
