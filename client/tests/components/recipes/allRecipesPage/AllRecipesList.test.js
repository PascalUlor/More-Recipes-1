/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import AllRecipesList
  from '../../../../components/allRecipesPage/AllRecipesList.jsx';


const props = {
  allRecipes: [{
    id: 1,
    title: '',
    recipeImage: '',
    viewsCount: 1,
    User: { fullName: '' },
    upvotes: 1,
    downvotes: 2
  }, {
    id: 2,
    title: '',
    recipeImage: '',
    viewsCount: 1,
    User: { fullName: '' },
    upvotes: 1,
    downvotes: 0
  }],
  errorMessage: ''
};

describe('AllRecipesList component', () => {
  it('should render correctly', () => {
    const mountWrapper = mount((
      <Router>
        <AllRecipesList {...props}/>
      </Router>
    ));
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const newProps = {
      ...props,
      allRecipes: []
    };
    const mountWrapper = mount((
      <Router>
        <AllRecipesList {...newProps}/>
      </Router>
    ));
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });
});
