/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import NotFoundPage from '../../../components/NotFoundPage.jsx';


describe('<NotFoundPage/>', () => {
  it('renders 404(not found page) component without crashing', () => {
    const shallowWrapper = shallow(<NotFoundPage/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
