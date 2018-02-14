/* eslint-disable */
import React from 'react';
import Procedures
  from '../../../../components/recipeDetailsPage/Procedures.jsx';


const props = {
  procedures: 'boil water.'
};

describe('Procedures component', () => {
  it('should render correctly', () => {
    const mountWrapper = shallow(<Procedures {...props}/>);
    expect(mountWrapper).toMatchSnapshot();
  });
});
