/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import PageHeader from '../../../components/profile/PageHeader.jsx';


describe('<Footer/>', () => {
  it('renders page header for profile component without crashing', () => {
    const shallowWrapper = shallow(<PageHeader/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
