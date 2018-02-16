/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import store from '../../../store';
import AllRecipesPage from '../../../components/AllRecipesPage.jsx';


const props = {};

const mountWrapper = mount((
  <Provider store={store}>
    <Router><AllRecipesPage {...props}/></Router>
  </Provider>
));
describe('AllRecipesPage component', () => {
  it('should render correctly', () => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('should call onChange() event', () => {
    mountWrapper.find('TextFieldGroup').find('input')
      .simulate('change', {
        target: {
          name: 'search',
          value: 'rice',
        },
      });
    expect(mountWrapper.find('AllRecipesPage')
      .instance().state.search).toEqual('rice');
  });

  it('should call handleSearch()', () => {
    mountWrapper.find('form').simulate('keyup');
    expect(mountWrapper.find('AllRecipesPage').instance().state.search)
      .toEqual('rice');
    mountWrapper.find('AllRecipesPage').instance().setState({
      search: '',
    });
    mountWrapper.find('form').simulate('keyup');
    expect(mountWrapper.find('AllRecipesPage').instance().state.search)
      .toEqual('');
  });
});
