/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { HomePage } from '../../../components/HomePage.jsx';


/**
 * @param { boolean } loading
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    fetchPopularRecipes: jest.fn(),
    fetchedPopularRecipes: [],
    isFetching: false,
    history: {
      push: jest.fn()
    }
  };
  const store = mockStore({});
  return shallow((
    <Provider store={store}>
      <Router><HomePage {...props}/></Router>
    </Provider>
  ));
};

describe('HomePage component', () => {
  const mountWrapper = setup();
  it('should render correctly', () => {
    expect(mountWrapper).toMatchSnapshot();
  });
});
