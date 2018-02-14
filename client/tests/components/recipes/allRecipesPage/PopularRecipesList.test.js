/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import PopularRecipesList
  from '../../../../components/allRecipesPage/PopularRecipesList.jsx';


const props = {
  popularRecipes: [{
    id: 1,
    title: '',
    User: { fullName: '' },
    upvotes: 1,
    downvotes: 2
  }, {
    id: 2,
    title: '',
    User: { fullName: '' },
    upvotes: 1,
    downvotes: 0
  }]
};

describe('AllRecipesList component', () => {
  it('should render correctly', () => {
    const mountWrapper = mount((
      <Router>
        <PopularRecipesList {...props}/>
      </Router>
    ));
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const newProps = {
      ...props,
      popularRecipes: []
    };
    const mountWrapper = mount((
      <Router>
        <PopularRecipesList {...newProps}/>
      </Router>
    ));
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });
});
