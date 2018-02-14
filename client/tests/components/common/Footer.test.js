/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import Footer from '../../../components/Footer.jsx';


describe('<Footer/>', () => {
  it('renders footer component without crashing', () => {
    const shallowWrapper = shallow(<Footer/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
