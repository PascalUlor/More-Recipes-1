/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import AppRoutes from '../../routes/AppRoutes.jsx';


describe('<AppRoutes/>', () => {
  it('renders entire app route components without crashing', () => {
    const shallowWrapper = shallow(<AppRoutes/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
