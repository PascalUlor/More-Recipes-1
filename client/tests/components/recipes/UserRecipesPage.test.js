/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { UserRecipesPage } from '../../../components/UserRecipesPage.jsx';


/**
 * @param { boolean } loading
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    fetchUserRecipes: jest.fn(),
    setCurrentRecipe: jest.fn(),
    checkDoubleRecipeTitle: jest.fn(),
    createRecipe: jest.fn(),
    deleteRecipe: jest.fn(),
    updateRecipe: jest.fn(),
    isFetching: true,
    userRecipes: [],
    paginationDetails: {},
    selectedRecipeId: 1,
    deleteSuccess: '',
    deleteError: ''
  };
  const store = mockStore({});
  return shallow((
    <Provider store={store}>
      <Router><UserRecipesPage {...props}/></Router>
    </Provider>
  ));
};

describe('UserRecipePage component', () => {
  const mountWrapper = setup();
  it('should render correctly', () => {
    expect(mountWrapper).toMatchSnapshot();
  });

//   it('should render loading gif is recipes are being fetched correctly', () => {
//     const newProps = {
//       getAllUserRecipes: jest.fn(),
//       fetching: true,
//       pageInfo: {},
//       deleteRecipe: jest.fn(),
//       userRecipes: []
//     };
//     const shallowWrapper = shallow(<UserRecipePage {...newProps} store={store} />);
//     expect(shallowWrapper.find('.loading-icon-container').length).toEqual(1);
//   });

//   it('should render correctly if there are no recipes', () => {
//     const newProps = {
//       getAllUserRecipes: jest.fn(),
//       fetching: false,
//       pageInfo: {},
//       deleteRecipe: jest.fn(),
//       userRecipes: []
//     };
//     const shallowWrapper = shallow(<UserRecipePage {...newProps} store={store} />);
//     expect(shallowWrapper.find('h3').length).toEqual(1);
//   });
// });

// describe('onPageChange', () => {
//   it('should work correctly', () => {
//     sinon.spy(UserRecipePage.prototype, 'onPageChange');
//     const props = {
//       getAllUserRecipes: jest.fn(),
//       fetching: false,
//       pageInfo: {},
//       deleteRecipe: jest.fn(),
//       userRecipes: [{}, {}]
//     };
//     const selected = {
//       current: 1
//     };
//     const shallowWrapper = shallow(<UserRecipePage {...props} store={store} />);
//     shallowWrapper.instance().onPageChange(selected);
//     expect(shallowWrapper.instance().props.getAllUserRecipes).toBeCalled();
//   });
});
