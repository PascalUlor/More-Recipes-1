/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import DeleteRecipeModal from '../../../components/DeleteRecipeModal.jsx';


describe('<DeleteRecipeModal/>', () => {
  const props = {
    handleDelete: () => {}
  };
  it('renders delete recipe modal component without crashing', () => {
    const shallowWrapper = shallow(<DeleteRecipeModal {...props}/>);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
