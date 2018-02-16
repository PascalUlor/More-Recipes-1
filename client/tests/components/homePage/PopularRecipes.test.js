/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import PopularRecipes from '../../../components/homePage/PopularRecipes.jsx';


let shallowWrapper;

describe('<PopularRecipes/>', () => {
  const initialProps = {
    fetchedPopularRecipes: []
  };
  it('renders popular recipes component without crashing', () => {
    shallowWrapper = shallow(<PopularRecipes {...initialProps}/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders popular recipes component without crashing', () => {
    const newProps = {
      fetchedPopularRecipes: [{
        id: 1,
        recipeImage: 'recipeOne.jpg',
        title: '',
        User: { fullName: '' },
        upvotes: 1,
        downvotes: 0,
        viewsCount: 1
      }]
    };

    shallowWrapper = mount((
      <Router>
        <PopularRecipes {...newProps}/>
      </Router>
    ));
    expect(shallowWrapper.find('PopularRecipesList').length).toBe(1);
  });
});
