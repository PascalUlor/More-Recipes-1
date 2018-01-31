import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import validateInputs from '../../shared/validations/review';
import verifyToken from '../../utils/verifyToken';
import addFlashMessage from '../../actions/actionCreators/flashMessage';

class ReviewsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  isValid() {
    const { errors, isValid } = validateInputs(this.state.review);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  handleChange(event) {
    this.setState({
      review: event.target.value
    });
  }
  handleOnFocus(event) {
    this.setState({
      errors: Object.assign({}, this.state.errors, { [event.target.name]: '' })
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (verifyToken()) {
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
    } else {
      this.props.addFlashMessage({
        type: 'failed',
        text: 'Sorry!!!. Please login to continue'
      });
      this.context.router.history.push('/signin');
    }
  }

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
              placeholder="enter your review for this recipe">
            </textarea>
            {errors.reviewBody && <span className="text-danger small">{errors.reviewBody}</span>}
          </div>
          <button className="btn btn-outline-success" type="submit">Post Review</button>
        </form>
      </div>
    );
  }
}

ReviewsForm.propTypes = {
  recipeId: PropTypes.number.isRequired,
  postReview: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  reviewSuccessMessage: PropTypes.string,
  reviewFailureMessage: PropTypes.string
};

ReviewsForm.contextTypes = {
  router: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
  reviewSuccessMessage: state.postReview.postReviewMessage,
  reviewFailureMessage: state.postReview.postReviewError
});

export default connect(mapStateToProps, { addFlashMessage })(ReviewsForm);