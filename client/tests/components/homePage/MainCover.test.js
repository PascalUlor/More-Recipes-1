/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import MainCover from '../../../components/homePage/MainCover.jsx';


describe('<Footer/>', () => {
  it('renders footer component without crashing', () => {
    const shallowWrapper = shallow(<MainCover/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
