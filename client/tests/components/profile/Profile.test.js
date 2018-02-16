/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { Profile } from '../../../components/Profile.jsx';
import store from '../../../store';


const user = {
  fullName: 'Chike',
  username: 'chyke',
  email: 'chike@gmail.com',
  profileImage: null,
  location: '',
  aboutMe: '',
  errors: {},
};
const props = {
  fetchProfile: jest.fn(),
  updateProfile: jest.fn(() => Promise.resolve()),
  isProfileUpdating: false,
};
const oldState = store.getState();
const newState = {
  ...oldState,
  userProfile: {
    isProfileUpdating: false,
    updatedProfile: {},
  },
};
const newStore = mockStore(newState);
let mountWrapper = mount((
  <Provider store={newStore}>
    <Router><Profile {...props} /></Router>
  </Provider>
));
describe('Profile component', () => {
  it('should render correctly', () => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('should call componentWillReceiveProps() for new recieved updates', () => {
    mountWrapper.find('Profile').instance().componentWillReceiveProps({
      updatedProfile: {
        updatedUser: {
          ...user,
        },
      },
    });
    expect(mountWrapper.find('Profile')
      .instance().state.username).toEqual('chyke');

    mountWrapper.find('Profile').instance().componentWillReceiveProps({
      updatedProfile: {
        updatedUser: undefined,
      },
      fetchedProfile: {
        ...user,
      },
    });
    expect(mountWrapper.find('Profile')
      .instance().state.username).toEqual('chyke');
  });

  it('should call onChange() and onClick() events', () => {
    mountWrapper.find('ProfileForm').find('TextFieldGroup')
      .at(0).find('input')
      .simulate('change', {
        target: {
          name: 'fullName',
          value: 'Chike',
        }
      });
    mountWrapper.find('ProfileForm').find('img').at(0).simulate('click');
    expect(mountWrapper.find('Profile').instance()
      .state.fullName).toEqual('Chike');
  });


  it('should call onFocus() event handler', () => {
    mountWrapper.find('ProfileForm').find('TextFieldGroup').at(0).find('input')
      .simulate('focus', {
        target: { name: 'username' },
      });
    expect(mountWrapper.find('Profile').instance().state.errors.username)
      .toEqual('');
  });

  it('should throw errors on invalidete input data', () => {
    mountWrapper.find('Profile').instance()
      .setState({
        ...user,
        fullName: '',
        username: '',
        email: '',
        location: '34 Lagos',
        aboutMe: 'ok'
      });
    mountWrapper.find('ProfileForm').find('form').simulate('submit', {
      preventDefault: jest.fn(),
    });
    expect(mountWrapper.find('Profile').instance().state.errors).toEqual({
      fullName: 'Full name is required',
      username: 'Username is required',
      email: 'Email is required',
      location: 'Provided location must contain only alphabets',
      aboutMe: 'Provided description must be at least 4 characters'
    });
  });

  it('should throw errors on invalidete input data', () => {
    mountWrapper.find('Profile').instance()
      .setState({
        ...user,
        fullName: 'Chike 45',
        username: 'ch',
        email: 'chike@gmail'
      });
    mountWrapper.find('ProfileForm').find('form').simulate('submit', {
      preventDefault: jest.fn(),
    });
    expect(mountWrapper.find('Profile').instance().state.errors).toEqual({
      fullName: 'Full name must contain only alphabets',
      username: 'Username must be at least 3 to 25 characters',
      email: 'Email is invalid'
    });
  });

  it('should throw a username error', () => {
    mountWrapper.find('Profile').instance()
      .setState({
        ...user,
        username: '2chike',
      });
    mountWrapper.find('ProfileForm').find('form').simulate('submit', {
      preventDefault: jest.fn(),
    });
    expect(mountWrapper.find('Profile').instance().state.errors).toEqual({
      username: 'Username must not start with number(s)'
    });
  });

  it('should update profile when all validations are met', () => {
    mountWrapper.find('Profile').instance().setState({ ...user });
    mountWrapper.find('ProfileForm').find('form').simulate('submit', {
      preventDefault: jest.fn(),
    });
    expect(mountWrapper.find('Profile').instance().state.errors).toEqual({});
  });
});
