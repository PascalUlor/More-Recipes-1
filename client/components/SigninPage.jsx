import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import userSigninRequest from '../actions/actionCreators/signinActions';
import addFlashMessage from '../actions/actionCreators/flashMessage';
import validateInputs from '../shared/validations/signin';
import SigninSignupImage from './SigninSignupImage.jsx';
import SigninForm from './signinPage/SigninForm.jsx';
import Footer from './Footer.jsx';

class SigninPage extends Component {
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

	componentWillMount() {
    const token = window.localStorage.jwtToken;
    jwt.verify(token, process.env.SECRET_KEY, (error) => {
      if (!error) {
        this.props.addFlashMessage({
					type: 'Success',
					text: 'You are already logged in'
        });
        this.context.router.history.push('/dashboard');
      }
    });
		const { isAuthenticated, flashMessage } = this.props;
		if (!isAuthenticated && typeof flashMessage.type !== 'undefined') {
			this.setState({ showWarning: true });
		} else if (isAuthenticated && typeof flashMessage.type !== 'undefined') {
			this.setState({ showWarning: true });
		}
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	isValid() {
		const { errors, isValid } = validateInputs(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
  }
  handleOnFocus(event) {
    this.setState({
      errors: Object.assign({}, this.state.errors, { [event.target.name]: '' })
    });
  }
	handleSubmit(event) {
		event.preventDefault();
    const { username, password } = this.state;
    this.props.addFlashMessage({});
    this.setState({ showWarning: false });

		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.userSigninRequest({ username, password })
			.then(() => {
				this.props.addFlashMessage({
					type: 'Success',
					text: 'You are now logged in'
				});
        this.context.router.history.push('/dashboard');
			})
			.catch(error => this.setState({ errors: error.response.data.errors, isLoading: false }));
		}
  }

  render() {
    return (
      <div>
        <div className="site-wrapper">
          <div className="container-fluid mt-4" style={{ height: '85.5vh' }}>
            <div className="row">
              <div className="col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
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
	flashMessage: PropTypes.shape().isRequired
};

SigninPage.contextTypes = {
  router: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.authenticatedUser.isAuthenticated,
	flashMessage: state.flashMessage
});

const mapDispatchToProps = dispatch => ({
  userSigninRequest: loginData => dispatch(userSigninRequest(loginData)),
  addFlashMessage: message => dispatch(addFlashMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);