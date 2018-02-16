/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import store from '../../../store';
import MyRecipesList from
  '../../../components/userRecipesPage/mainContents/myRecipes/MyRecipesList.jsx';


const recipe = {
  title: 'new test title',
  ingredients: 'ing1, ing2, ingredient3, ingredient4, ingredient5, ingredient6',
  procedures: 'new test procedure for this new added recipe',
  imageFile: {},
  imageSrc: '/images/noimageyet.jpg',
  errors: {}
};
let props = {
  myRecipes: [{ ...recipe, id: 89 }, { ...recipe, id: 90 }],
  setCurrentRecipe: jest.fn(),
};
const setCurrentRecipeSpy = sinon.spy(props, 'setCurrentRecipe');
describe('Testing MyRecipesList component', () => {
  it('Should render without error', () => {
    const mountWrapper = mount((
      <Provider store={store}>
        <Router><MyRecipesList {...props}/></Router>
      </Provider>
    ));
    expect(toJson(mountWrapper)).toMatchSnapshot();
    const event = {};
    mountWrapper.find('button').at(0).simulate('click', event);
    expect(setCurrentRecipeSpy.called).toEqual(true);
    mountWrapper.find('button').at(1).simulate('click', event);
    expect(setCurrentRecipeSpy.called).toEqual(true);
  });

  it('Should render without error', () => {
    props = {
      ...props,
      myRecipes: [],
    };
    const mountWrapper = mount((
      <Provider store={store}>
        <Router><MyRecipesList {...props}/></Router>
      </Provider>
    ));
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });
});
