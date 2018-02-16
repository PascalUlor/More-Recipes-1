/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import store from '../../../store';
import FavoriteRecipesPage from '../../../components/FavoriteRecipesPage.jsx';


const props = {
  fetchFavoriteRecipes: jest.fn(() => Promise.resolve()),
  deleteFavoriteRecipe: jest.fn(() => Promise.resolve()),
  setCurrentRecipe: jest.fn(),
  favoriteRecipes: [],
  isFetching: false,
  deleteSuccess: '',
  deleteError: '',
  currentRecipeId: 1,
  paginationDetails: {}
};

const mountWrapper = mount((
  <Provider store={store}>
    <Router><FavoriteRecipesPage {...props}/></Router>
  </Provider>
));

describe('FavoriteRecipesPage component', () => {
  it('should render correctly', () => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });
  it('should call handlePageChange()', () => {
    const oldState = store.getState();
    const newState = {
      ...oldState,
      favoriteRecipes: {
        isFavoriteRecipesFetching: false,
        fetchedFavoriteRecipes: [{}, {}],
        paginationDetails: {
          currentPage: 1,
        },
      },
    };
    const newStore = mockStore(newState);
    const mountWrapper = mount((
      <Provider store={newStore}>
        <Router><FavoriteRecipesPage {...props}/></Router>
      </Provider>
    ));
  });

  it('should call handleDeleteFavoriteRecipe()', () => {
    mountWrapper.find('FavoriteRecipesPage')
      .instance().handleDeleteFavoriteRecipe();
  });
});
