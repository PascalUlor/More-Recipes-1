/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import NotFoundPage from '../../../components/NotFoundPage.jsx';


describe('<Footer/>', () => {
  it('renders footer component without crashing', () => {
    const shallowWrapper = shallow(<NotFoundPage/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
