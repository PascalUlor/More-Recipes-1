/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { RecipeDetailsPage } from '../../../components/RecipeDetailsPage.jsx';


/**
 * @param { boolean } loading
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    setCurrentRecipe: jest.fn(),
    postReview: jest.fn(),
    addFavorite: jest.fn(),
    voteRecipe: jest.fn(),
    recipeDetails: {},
    addFavoriteSuccess: '',
    addFavoriteError: '',
    voteSuccessMessage: '',
    voteFailureMessage: '',
    match: {
      params: {
        id: 1
      }
    },
  };
  const store = mockStore({});
  return shallow((
    <Provider store={store}>
      <Router><RecipeDetailsPage {...props}/></Router>
    </Provider>
  ));
};

describe('RecipeDetailsPage component', () => {
  const mountWrapper = setup();
  it('should render correctly', () => {
    expect(mountWrapper).toMatchSnapshot();
  });
});
