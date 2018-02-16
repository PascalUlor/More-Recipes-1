/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import store from '../../../store';
import { RecipeDetailsPage } from '../../../components/RecipeDetailsPage.jsx';
import verifyToken from '../../../utils/verifyToken';


const props = {
  match: {
    params: { id: 20 }
  },
  setCurrentRecipe: jest.fn(() => Promise.resolve()),
  postReview: jest.fn(() => Promise.resolve()),
  addFavorite: jest.fn(() => Promise.resolve()),
  voteRecipe: jest.fn(() => Promise.resolve()),
  recipeDetails: {},
  addFavoriteSuccess: '',
  addFavoriteError: '',
  voteSuccessMessage: '',
  voteFailureMessage: '',
  history: {
    push: jest.fn(),
    location: {
      pathname: ''
    }
  }
};
const mountWrapper = mount((
  <Provider store={store}>
    <Router><RecipeDetailsPage {...props}/></Router>
  </Provider>
));
const recipe = {
  id: 34,
  title: 'recipe',
  ingredients: 'onions. salt',
  procedures: 'boil water then sleep',
  recipeImage: 'recipe.jpg',
  upvotes: 2,
  downvotes: 2,
  updatedAt: '',
  User: {
    fullName: 'kate'
  },
  Reviews: []
};
describe('RecipeDetailsPage component', () => {
  it('should render correctly', () => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
    mountWrapper.find('RecipeDetailsPage').instance()
      .componentWillReceiveProps({
        recipeDetails: {
          recipe
        },
      });
  });
  it('should call handleFavorite()', () => {
    sinon.stub({ verifyToken }, 'verifyToken').returns(1);
    mountWrapper.find('RecipeDetailsPage')
      .find('TopContents').find('i#favorite').simulate('click');
  });
  it('should call handleVote()', () => {
    mountWrapper.find('RecipeDetailsPage')
      .find('TopContents').find('i#upvote').simulate('click');
  });
  it('should call handleVote()', () => {
    mountWrapper.find('RecipeDetailsPage')
      .find('TopContents').find('i#downvote').simulate('click');
  });
});
