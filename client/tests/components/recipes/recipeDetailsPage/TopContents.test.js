/* eslint-disable */
import React from 'react';
import TopContents
  from '../../../../components/recipeDetailsPage/TopContents.jsx';


const props = {
  addFavorite: jest.fn(),
  voteRecipe: jest.fn(),
  details: {
    title: '',
    recipeImage: '',
    upvotes: 1,
    downvotes: 0,
    createdBy: '',
    lastUpdated: '',
    isFavorited: false,
    vote: ''
  }
};

describe('TopContents component', () => {
  it('should render correctly', () => {
    const mountWrapper = shallow(<TopContents {...props}/>);
    expect(mountWrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const newProps = {
      ...props,
      details: {
        ...props.details,
        isFavorited: true,
        vote: 'upvote'
      }
    };
    const shallowWrapper = shallow((
      <TopContents {...newProps}/>
    ));
    const favorite = shallowWrapper.find('#favorite');
    expect(favorite.hasClass('fa-heart')).toEqual(true);
  });

  it('should render correctly', () => {
    const newProps = {
      ...props,
      details: {
        ...props.details,
        vote: 'downvote'
      }
    };
    const shallowWrapper = shallow(<TopContents {...newProps} vote='downvote'/>);
    const downvote = shallowWrapper.find('#downvote');
    expect(downvote.hasClass('fa-thumbs-down')).toEqual(true);
  });
});
