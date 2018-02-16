/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import { ReviewsForm }
  from '../../../../components/recipeDetailsPage/ReviewsForm.jsx';

/**
 *
 * @return { object } props - properties of the class instance
 */
const setup = () => {
  const props = {
    recipeId: 1,
    postReview: jest.fn(() => Promise.resolve()),
    reviewSuccessMessage: '',
    reviewFailureMessage: '',
    history: {
      location: {
        pathname: '/'
      },
      push: jest.fn()
    }
  };
  return props;
};

const props = setup();
let shallowWrapper = shallow(<ReviewsForm {...props}/>);

describe('<SignupForm/>', () => {
  it('renders form with five input fields and a button', () => {
    expect(shallowWrapper.find('div').length).toBe(2);
    expect(shallowWrapper.find('form').length).toBe(1);
    expect(shallowWrapper.find('textarea').length).toBe(1);
    expect(shallowWrapper.find('button').length).toBe(1);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should call onChange() event', () => {
    shallowWrapper.find('textarea')
      .simulate('change', {
        target: {
          name: 'reviewBody',
          value: 'Nice job',
        },
      });
    expect(shallowWrapper.instance().state.review).toEqual('Nice job');
  });

  it('should call onFocus() event', () => {
    shallowWrapper.find('textarea').simulate('focus', {
      target: {
        name: 'reviewBody',
        value: '',
      }
    });
    expect(shallowWrapper.instance().state.errors).toEqual({
      reviewBody: ''
    });
  });

  it('should call onKeyUp() event', () => {
    shallowWrapper.find('textarea').simulate('keyUp');
    expect(shallowWrapper.instance().state.review).toEqual('');
  });

  describe('handleSubmit()', () => {
    const event = {
      preventDefault: jest.fn()
    };

    it('should return an error for empty review body', (done) => {
      shallowWrapper.find('form')
        .simulate('submit', event);
      expect(shallowWrapper.instance().isValid()).toBe(false);
      expect(shallowWrapper.state().errors).toEqual({
        reviewBody: 'Review for recipe is required'
      });
      done();
    });

    it('should return error when length of review is less than 4', (done) => {
      shallowWrapper.setState({ review: 'bad' });
      shallowWrapper.find('form')
        .simulate('submit', event);
      expect(shallowWrapper.instance().isValid()).toBe(false);
      expect(shallowWrapper.state().errors).toEqual({
        reviewBody: 'Review provided must be atleast 4 characters'
      });
      done();
    });

    it('should alert failure message on error during posting', (done) => {
      const newProps = {
        ...props,
        reviewFailureMessage: 'error occurred'
      };
      shallowWrapper = shallow(<ReviewsForm {...newProps}/>);
      shallowWrapper.setState({ review: 'Nice job' });
      shallowWrapper.find('form')
        .simulate('submit', event);
      expect(shallowWrapper.instance().isValid()).toBe(true);
      expect(shallowWrapper.state().errors).toEqual({});
      expect(shallowWrapper.instance().props.reviewFailureMessage)
        .toEqual('error occurred');
      done();
    });
    it('should alert success message on no post error', (done) => {
      const newProps = {
        ...props,
        reviewSuccessMessage: 'review has been posted'
      };
      shallowWrapper = shallow(<ReviewsForm {...newProps}/>);
      shallowWrapper.setState({ review: 'Nice job' });
      shallowWrapper.find('form')
        .simulate('submit', event);
      expect(shallowWrapper.instance().isValid()).toBe(true);
      expect(shallowWrapper.state().errors).toEqual({});
      expect(shallowWrapper.instance().props.reviewSuccessMessage)
        .toEqual('review has been posted');
      done();
    });
  });
});
