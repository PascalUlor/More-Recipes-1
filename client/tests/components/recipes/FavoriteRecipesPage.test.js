/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import {
  FavoriteRecipesPage
} from '../../../components/FavoriteRecipesPage.jsx';


/**
 * @param { boolean } loading
 *
 * @return { * } null
 */

const props = {
  fetchFavoriteRecipes: jest.fn(),
  deleteFavoriteRecipe: jest.fn(),
  setCurrentRecipe: jest.fn(),
  favoriteRecipes: [],
  isFetching: false,
  deleteSuccess: '',
  deleteError: '',
  currentRecipeId: 1,
  paginationDetails: {}
};

sinon.spy(FavoriteRecipesPage.prototype, 'componentDidMount');
describe('FavoriteRecipesPage component', () => {
  const store = mockStore({});
  const shallowWrapper = shallow((
    <Provider store={store}>
      <Router><FavoriteRecipesPage {...props}/></Router>
    </Provider>
  ));
  it('should render correctly', () => {
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
  it('should work call handlePageChange()', () => {
    sinon.spy(FavoriteRecipesPage.prototype, 'handlePageChange');
    const newProps = {
      ...props,
      isFetching: true
    };
    const shallowWrapper = shallow((
      <Provider store={store}>
        <Router><FavoriteRecipesPage {...newProps}/></Router>
      </Provider>
    ));
  });
});
