import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import validateInputs from '../../shared/validations/review';
import verifyToken from '../../utils/verifyToken';
import redirect from '../../utils/redirect';


/**
 * @description HOC for ReviewsForm component
 *
 * @class ReviewsForm
 *
 * @extends Component
 */
export class ReviewsForm extends Component {
  /**
   * @description creates an instance of ReviewsForm
   *
   * @constructor
   *
   * @param { props } props - contains review form component properties
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  /**
   * @description handles client validation checks
   * @method isValid
   *
   * @returns { bool } true/false when form is submitted
   */
  isValid() {
    const { errors, isValid } = validateInputs(this.state.review);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @description handles on state change
   * @method handleChange
   *
   * @param { object } event - event object containing review detail
   *
   * @returns { object } new review detail state
   */
  handleChange(event) {
    this.setState({
      review: event.target.value
    });
  }
  /**
   * @description handles on focus event
   * @method handleOnFocus
   *
   * @param { object } event - event object containing review detail
   *
   * @returns { object } new review detail state
   */
  handleOnFocus(event) {
    this.setState({
      errors: Object.assign({}, this.state.errors, { [event.target.name]: '' })
    });
  }
  /**
   * @description handles on focus event
   * @method handleKeyPress
   *
   * @returns { * } null
   */
  handleKeyUp() {
    if (!verifyToken()) {
      this.setState({ review: '' });
      redirect(this.props);
    }
  }
  /**
   * @description handles on submit event for posting a review
   *
   * @param { object } event - event object containing review detail
   *
   * @returns { * } null
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.postReview(this.state.review, this.props.recipeId)
        .then(() => {
          if (this.props.reviewSuccessMessage) {
            this.setState({ review: '' });
            toastr.success(this.props.reviewSuccessMessage);
          } else {
            toastr.error(this.props.reviewFailureMessage);
          }
        });
    }
  }
  /**
   * @description displays recipe review form
   *
   * @returns { jsx } jsx - renders ReviewsForm component
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <h5 className="mt-3 page-text font-weight-bold">Post Your Review</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="col p-0 mb-2">
            <textarea rows="7"
              className="form-control"
              name="reviewBody"
              value={this.state.review}
              onChange={this.handleChange}
              onFocus={this.handleOnFocus}
              onKeyUp={this.handleKeyUp}
              placeholder="enter your review for this recipe">
            </textarea>
            {
              errors.reviewBody &&
              <span className="text-danger small">
                {errors.reviewBody}
              </span>
            }
          </div>
          <button className="btn btn-outline-success"
            type="submit">
              Post Review
          </button>
        </form>
      </div>
    );
  }
}

ReviewsForm.propTypes = {
  recipeId: PropTypes.number.isRequired,
  postReview: PropTypes.func.isRequired,
  reviewSuccessMessage: PropTypes.string,
  reviewFailureMessage: PropTypes.string
};

/**
 * @description maps redux state to props
 *
 * @param { object } state - holds recipe review state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  reviewSuccessMessage: state.postReview.postReviewMessage,
  reviewFailureMessage: state.postReview.postReviewError
});

export default connect(mapStateToProps)(ReviewsForm);
