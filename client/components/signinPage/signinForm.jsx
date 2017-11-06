import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../../common/textFieldGroup.jsx';
import validateInputs from '../../shared/validations/signin';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    isValid() {
        const { errors, isValid } = validateInputs(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSigninRequest(this.state)
            .then(() => {
                this.props.addFlashMessage({
                    type: 'Success',
                    text: 'You are now logged in'
                });
                this.context.router.history.push('/api/v1/users/dashboard');
            })
            .catch(error => this.setState({ errors: error.response.data.errors, isLoading: false }));
        }
    }
    render() {
        const { username, password, errors, isLoading } = this.state;
        return (
            // <!--Form Section Start-->
            <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                <h2>Sign In</h2>
                <p className="lead">Don&#39;t have a More-Recipes account? <Link to="/api/v1/users/signup">Sign Up</Link>
                </p>
                {errors.form && <div className='alert alert-danger text-center'>{errors.form}</div>}
                <form role="form" onSubmit={this.handleSubmit}>
                    <TextFieldGroup
                        label='Username' font="fa fa-user-circle-o" name='username' value={username}
                        error={errors.username} onChange={this.onChange} placeholder='enter username'/>
                    <TextFieldGroup
                        label='Password' font="fa fa-lock" name='password' type='password' value={password}
                        error={errors.password} onChange={this.onChange} placeholder='enter password'/>
                    <button type="submit" className="btn btn-outline-success" disabled={isLoading}>Sign In</button>
                </form>
            </div>
        // <!--Form Section End-->
        );
    }
}

SignupForm.propTypes = {
    userSigninRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignupForm;