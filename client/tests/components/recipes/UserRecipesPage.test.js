/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { UserRecipesPage } from '../../../components/UserRecipesPage.jsx';
import store from '../../../store';


const recipe = {
  title: 'new test title',
  ingredients: 'ing1, ing2, ingredient3, ingredient4, ingredient5, ingredient6',
  procedures: 'new test procedure for this new added recipe',
  imageFile: {},
  imageSrc: '/images/noimageyet.jpg',
  errors: {}
};
const props = {
  fetchUserRecipes: jest.fn(),
  setCurrentRecipe: jest.fn(),
  checkDoubleRecipeTitle: jest.fn(() => Promise.resolve()),
  createRecipe: jest.fn(() => Promise.resolve()),
  deleteRecipe: jest.fn(),
  updateRecipe: jest.fn(() => Promise.resolve()),
  isFetching: true,
  userRecipes: [],
  paginationDetails: {},
  selectedRecipeId: 1,
  deleteSuccess: '',
  deleteError: '',
  doubleTitleError: null,
};
const oldState = store.getState();
const mountWrapper = mount((
  <Provider store={store}>
    <Router><UserRecipesPage {...props}/></Router>
  </Provider>
));

describe('UserRecipesPage component', () => {
  it('should render correctly', () => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('Should call onChange() and onFocus() event handlers', () => {
    const event = {
      target: {
        name: 'title',
        value: 'new recipe',
      }
    };
    mountWrapper.find('CreateRecipeModal').find('input').at(0)
      .simulate('change', event);
    expect(mountWrapper.find('CreateRecipeModal').instance().state.title)
      .toEqual('new recipe');
    mountWrapper.find('CreateRecipeModal').find('input').at(0)
      .simulate('focus', event);
    expect(mountWrapper.find('CreateRecipeModal').instance()
      .state.errors.title).toEqual('');
  });

  it('Should call onSubmit() event handler with error', () => {
    const newState = {
      ...oldState,
      checkDoubleRecipeTitle: {
        isRecipeTitleDouble: true,
        doubleRecipeTitleError: 'error occured'
      }
    };
    const newStore = mockStore(newState);
    const mountWrapper2 = mount((
      <Provider store={newStore}>
        <Router><UserRecipesPage {...props}/></Router>
      </Provider>
    ));
    mountWrapper2.find('CreateRecipeModal').instance()
      .setState({ ...recipe });
    mountWrapper2.find('CreateRecipeModal').find('form').at(0)
      .simulate('submit', {});
    expect(mountWrapper2.find('CreateRecipeModal').instance()
      .props.doubleTitleError).toEqual('error occured');
  });

  it('Should call handleSubmit() event for create recipe without error', () => {
    const newerState = {
      ...oldState,
      checkDoubleRecipeTitle: {
        isRecipeTitleDouble: false,
        doubleRecipeTitleError: ''
      }
    };
    const newerStore = mockStore(newerState);
    const mountWrapper3 = mount((
      <Provider store={newerStore}>
        <Router><UserRecipesPage {...props}/></Router>
      </Provider>
    ));
    mountWrapper3.find('CreateRecipeModal').instance()
      .setState({ ...recipe });
    mountWrapper3.find('CreateRecipeModal').find('form').at(0)
      .simulate('submit', {});
    expect(mountWrapper3.find('CreateRecipeModal').instance()
      .props.doubleTitleError).toBeFalsy();
  });

  it('Should set state on componentWillReceiveProps()', () => {
    mountWrapper.find('EditRecipeModal').instance().setState({ id: 42 });
    mountWrapper.find('EditRecipeModal').instance().componentWillReceiveProps({
      currentSetRecipeId: 45,
      currentRecipeDetails: { ...recipe, title: 'update recipe' },
    });
    expect(mountWrapper.find('EditRecipeModal').instance()
      .state.initialTitle).toEqual('update recipe');
  });

  it('Should call handleSubmit() event for edit recipe without errors', () => {
    const newState = {
      ...oldState,
      checkDoubleRecipeTitle: {
        isRecipeTitleDouble: false,
        doubleRecipeTitleError: ''
      }
    };
    const newerStore = mockStore(newState);
    const mountWrapper1 = mount((
      <Provider store={newerStore}>
        <Router><UserRecipesPage {...props}/></Router>
      </Provider>
    ));
    mountWrapper1.find('EditRecipeModal').instance()
      .setState({ ...recipe, title: 'changed title' });
    mountWrapper1.find('EditRecipeModal').instance()
      .setState({ initialTitle: 'changed title' });
    mountWrapper1.find('EditRecipeModal').find('form')
      .at(0).simulate('submit', {});

    const newerState2 = {
      ...oldState,
      checkDoubleRecipeTitle: {
        isRecipeTitleDouble: false,
        doubleRecipeTitleError: ''
      }
    };
    const newerStore2 = mockStore(newerState2);
    const mountWrapper2 = mount((
      <Provider store={newerStore2}>
        <Router><UserRecipesPage {...props}/></Router>
      </Provider>
    ));
    mountWrapper2.find('EditRecipeModal').instance()
      .setState({ ...recipe, title: 'changed title unequal' });
    mountWrapper2.find('EditRecipeModal').instance()
      .setState({ initialTitle: 'changed title' });
    mountWrapper2.find('EditRecipeModal').find('form').at(0)
      .simulate('submit', {});
  });
});
