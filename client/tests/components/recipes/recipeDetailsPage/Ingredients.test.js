/* eslint-disable */
import React from 'react';
import Ingredients
  from '../../../../components/recipeDetailsPage/Ingredients.jsx';


const props = {
  ingredients: 'onions.'
};

describe('Ingredients component', () => {
  it('should render correctly', () => {
    const mountWrapper = shallow(<Ingredients {...props}/>);
    expect(mountWrapper).toMatchSnapshot();
  });
});
