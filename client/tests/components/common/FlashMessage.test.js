import React from 'react';
/* eslint-disable */
import toJson from 'enzyme-to-json';
import { FlashMessage } from '../../../components/FlashMessage.jsx';


describe('<FlashMessage/>', () => {
  const props = {
    message: {}
  };
  it('renders flash messsage component without crashing', () => {
    const shallowWrapper = shallow(<FlashMessage {...props}/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
