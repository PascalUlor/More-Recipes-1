/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import {
  AllRecipesPage
} from '../../../components/AllRecipesPage.jsx';


/**
 * @param { boolean } loading
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    fetchPopularRecipes: jest.fn(),
    fetchAllRecipes: jest.fn(),
    isPopularFetching: false,
    isAllFetching: false,
    fetchedPopularRecipes: [],
    fetchedAllRecipes: [],
    paginationDetails: {},
    errorMessage: ''
  };
  return props;
};

const props = setup();
const store = mockStore({});
const shallowWrapper = shallow((
  <Provider store={store}>
    <Router><AllRecipesPage {...props}/></Router>
  </Provider>
));
describe('AllRecipesPage component', () => {
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  // it('should call onChange() event', () => {
  //   shallowWrapper.find('TextFieldGroup').find('input')
  //     .simulate('change', {
  //       target: {
  //         name: 'search',
  //         value: 'rice',
  //       },
  //     });
  //   // expect(shallowWrapper.instance().state.search).toEqual('rice');
  //   // expect(shallowWrapper.instance().fetchAllRecipes).toHaveBeenCalled();
  // });
});
