/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import { ReviewsForm }
  from '../../../../components/recipeDetailsPage/ReviewsForm.jsx';

/**
 *
 * @return { object } props
 */
const setup = () => {
  const props = {
    recipeId: 1,
    postReview: jest.fn(),
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


const simulateInput = (name, value) => {
  const event = {
    target: {
      name,
      value
    }
  };
  return event;
};
const props = setup();
const shallowWrapper = shallow(<ReviewsForm {...props}/>);
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
  });

  it('should call onKeyUp() event', () => {
    shallowWrapper.find('textarea').simulate('keyUp');
    shallowWrapper.instance().handleKeyUp();
  });

  describe('handleSubmit()', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'reviewBody',
        value: 'bad'
      }
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

    // it(
    //   'should return error if length of review body is less than four',
    //   (done) => {
    //     shallowWrapper.instance()
    //       .handleChange(simulateInput('reviewBody', 'bad'));
    //     shallowWrapper.setState({ review: 'baddo' });
    //     shallowWrapper.find('form').simulate('submit');
    //     // shallowWrapper.instance().handleSubmit(event);
    //     // shallowWrapper.find('form').simulate('submit', { preventDefault: jest.fn()});
    //     // expect(shallowWrapper.state().review).toEqual('bad');
    //     console.log(shallowWrapper.instance().handleSubmit.children());
    //     // console.log(shallowWrapper.state());
    //     // expect(shallowWrapper.state().errors).toEqual({
    //     //   reviewBody: 'Review provided must be atleast 4 characters'
    //     // });
    //     done();
    //   }
    // );

    // it('should work if provided form details are valid', () => {
    //   signupPage.setState({
    //     fullName: 'Richie Rich',
    //     username: 'rich',
    //     email: 'rich@gmail.com',
    //     password: '12345678',
    //     repassword: '12345678'
    //   });
    //   submit();
    //   expect(signupPage.state.errors).toEqual({});
    //   expect(signupPage.props.userSignupRequest).toBeCalled();
    // });
  });
});
