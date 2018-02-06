import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import userSignupRequest from '../actions/actionCreators/signupActions';
import addFlashMessage from '../actions/actionCreators/flashMessage';
import validateInputs from '../shared/validations/signup';
import SigninSignupImage from './SigninSignupImage.jsx';
import SignupForm from './signupPage/SignupForm.jsx';
import Footer from './Footer.jsx';
import verifyToken from '../utils/verifyToken';


/**
 * @description HOC for rendering sign up component
 *
 * @class SigninPage
 *
 * @extends Component
 */
class SignupPage extends Component {
  /**
   * @description creates an instance of SignupPage
   * 
   * @constructor
   *
   * @param { props } props - contains sign up component properties
   */
	constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      username: '',
      email: '',
      password: '',
      repassword: '',
      errors: {},
      isLoading: false
    };
		this.handleChange = this.handleChange.bind(this);
		this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  /**
   * @description handles token verification and page redirection
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
      this.context.router.history.push('/dashboard');
    }
  }
  /**
   * @description handles on state change
   * @method handleChange
   * 
   * @param { object } event - event object containing sign up details
   *
   * @returns { object } new sign up details state
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
   * @param { object } event - event object containing sign up details
   *
   * @returns { object } new sign up details state
   */
	handleOnFocus(event) {
    this.setState({
      errors: Object.assign({}, this.state.errors, { [event.target.name]: '' })
    });
  }
   /**
    * @description handles form submition
    * @method handleSubmit
    *
    * @returns {*} null
    */                       
  handleSubmit(event) {
		event.preventDefault();
		const {
			fullName, username, email, password, repassword
		} = this.state;
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest({
				fullName, username, email, password, repassword
			})
      .then(() => {
        this.props.addFlashMessage({
          type: 'Success',
          text: 'Successfully Created Account.'
        });
        this.context.router.history.push('/dashboard');
      })
      .catch(error =>
        this.setState({ errors: error.response.data.errors, isLoading: false }));
    }
  }
  /**
   * @description renders sign up form
   *
   * @returns { jsx } jsx - renders sign up form
   */
	render() {
		return (
			<div>
				<div id="site-wrapper">
					<div className="container-fluid mt-4" style={{ minHeight: '85.5vh' }}>
						<div className="row">
              <div className=
"col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
								<div className="row">
									<SigninSignupImage/>
									<SignupForm
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

SignupPage.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired
};
/**
 * @description maps action dispatch to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @returns { object } props - returns mapped props from dispatch action
 */
SignupPage.contextTypes = {
  router: PropTypes.shape().isRequired
};

const mapDispatchToProps = dispatch => ({
  userSignupRequest: signupData => dispatch(userSignupRequest(signupData)),
  addFlashMessage: message => dispatch(addFlashMessage(message))
});

export default connect(null, mapDispatchToProps)(SignupPage);
