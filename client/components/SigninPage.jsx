import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import userSigninRequest from '../actions/actionCreators/signinActions';
import addFlashMessage from '../actions/actionCreators/flashMessage';
import validateInputs from '../shared/validations/signin';
import SigninSignupImage from './SigninSignupImage.jsx';
import SigninForm from './signinPage/SigninForm.jsx';
import Footer from './Footer.jsx';
import verifyToken from '../utils/verifyToken';


/**
 * @description HOC for rendering sign in component
 *
 * @class SigninPage
 *
 * @extends Component
 */
export class SigninPage extends Component {
  /**
   * @description creates an instance of SigninPage
   *
   * @constructor
   *
   * @param { props } props - contains sign in component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
      showWarning: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  /**
  * @description handles fetching details of seleted recipe
  *
  * @method componentDidMount
  *
  * @returns {boolean} show warning boolean of either true or false
  */
  componentDidMount() {
    if (verifyToken()) {
      this.props.addFlashMessage({
        type: 'Success',
        text: 'You are already logged in'
      });
      this.props.history.push('/dashboard');
    }
    const { isAuthenticated, flashMessage } = this.props;
    if (!isAuthenticated && typeof flashMessage.type !== 'undefined') {
      this.setState({ showWarning: true });
    } else if (isAuthenticated && typeof flashMessage.type !== 'undefined') {
      this.setState({ showWarning: true });
    }
  }
  /**
   * @description handles on state change
   * @method handleChange
   *
   * @param { object } event - event object containing sign in details
   *
   * @returns { object } new sign in details state
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @description handles client validation checks
   * @method isValid
   *
   * @returns { bool } true/false when form is submitted
   */
  isValid() {
    const { errors, isValid } = validateInputs(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @description handles on focus event
   * @method handleOnFocus
   *
   * @param { object } event - event object containing sign in details
   *
   * @returns { object } new sign in details state
   */
  handleOnFocus(event) {
    this.setState({
      errors: Object.assign(
        {},
        this.state.errors, {
          [event.target.name]: '',
          form: ''
        }
      )
    });
  }
  /**
   * @description handles form submition
   * @method handleSubmit
   *
   * @param { object } event
   *
   * @returns {*} null
   */
  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.addFlashMessage({});
    this.setState({ showWarning: false });

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSigninRequest({ username, password })
        .then(() => {
          const redirectPath = this.props.history.location.search.split('=')[1];
          if (!redirectPath) {
            this.props.addFlashMessage({
              type: 'Success',
              text: 'You are now logged in'
            });
            this.props.history.push('/dashboard');
          } else {
            this.props.history.push(`${redirectPath}`);
            toastr.success('welcome back');
          }
        })
        .catch(error =>
          this.setState({
            errors: error.response.data.errors,
            isLoading: false,
          }));
    }
  }
  /**
   * @description renders sign in form
   *
   * @returns { jsx } jsx - renders sign in form
   */
  render() {
    return (
      <div>
        <div className="site-wrapper">
          <div className="container-fluid mt-4" style={{ height: '85.5vh' }}>
            <div className="row">
              <div
                className=
                  "col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
                <div className="row">
                  <SigninSignupImage/>
                  <SigninForm
                    handleChange={this.handleChange}
                    handleFocus={this.handleOnFocus}
                    handleSubmit={this.handleSubmit}
                    {...this.state}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

SigninPage.propTypes = {
  userSigninRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  flashMessage: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

/**
 * @description maps redux state to props
 *
 * @param { object } state - holds sign in state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  isAuthenticated: state.authenticatedUser.isAuthenticated,
  flashMessage: state.flashMessage
});
/**
 * @description maps action dispatch to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
const mapDispatchToProps = dispatch => ({
  userSigninRequest: loginData => dispatch(userSigninRequest(loginData)),
  addFlashMessage: message => dispatch(addFlashMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
