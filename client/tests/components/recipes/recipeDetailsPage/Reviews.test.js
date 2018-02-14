/* eslint-disable */
import React from 'react';
import Reviews
  from '../../../../components/recipeDetailsPage/Reviews.jsx';


const props = {
  reviews: [{
    id: 1,
    profileImage: null,
    username: '',
    createdAt: '',
    reviewBody: ''
  }, {
    id: 2,
    profileImage: 'profileImage.jpg',
    username: '',
    createdAt: '',
    reviewBody: ''
  }]
};

describe('Reviews component', () => {
  it('should render correctly', () => {
    const mountWrapper = mount(<Reviews {...props}/>);
    expect(mountWrapper).toMatchSnapshot();
  });
});
