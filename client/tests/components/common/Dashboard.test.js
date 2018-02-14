/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import Dashboard from '../../../components/Dashboard.jsx';


describe('<Dashboard/>', () => {
  it('renders dashboard component without crashing', () => {
    const shallowWrapper = shallow(<Dashboard/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
