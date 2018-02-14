/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import PageHeader
  from '../../../../components/allRecipesPage/PageHeader.jsx';


describe('PageHeader component', () => {
  it('should render correctly', () => {
    const mountWrapper = shallow(<PageHeader/>);
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });
});
