/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import FavoriteRecipesList
  from '../../../../components/favoriteRecipesPage/FavoriteRecipesList.jsx';

const Recipe = {
  recipeImage: 'recipeImage.jpg',
  User: { fullName: '' }
};
const props = {
  setCurrentRecipe: jest.fn(),
  favorites: [{
    id: 1,
    Recipe
  }, {
    id: 2,
    Recipe
  }]
};

describe('FavoriteRecipesList component', () => {
  it('should render correctly', () => {
    const mountWrapper = mount((
      <Router>
        <FavoriteRecipesList {...props}/>
      </Router>
    ));
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const newProps = {
      ...props,
      favorites: []
    };
    const mountWrapper = mount((
      <Router>
        <FavoriteRecipesList {...newProps}/>
      </Router>
    ));
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });
});
