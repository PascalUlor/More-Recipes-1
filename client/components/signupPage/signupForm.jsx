import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../../common/textFieldGroup.jsx';
import validateInputs from '../../shared/validations/signup';

export default class SignupForm extends Component {
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
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
        this.props.userSignupRequest(this.state)
        .then(() => {})
        .catch(error => this.setState({ errors: error.response.data.errors, isLoading: false }));
        }
    }
    render() {
        const { fullName, username, email, password, repassword, errors, isLoading } = this.state;

        return (
            // <!--Form Section Start-->
            <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                <h2>Sign Up</h2>
                <p className="lead">Already have a More-Recipes account? <Link to="/api/v1/user/signin">Sign In</Link>
                </p>
                <form role="form" onSubmit={this.handleSubmit} className="pb-2">
                    <TextFieldGroup
                        label='Full Name' font="fa fa-user-circle-o" name='fullName' value={fullName}
                        error={errors.fullName} onChange={this.onChange} placeholder='enter full name'/>
                    <TextFieldGroup
                        label='Username' font="fa fa-user-circle-o" name='username' value={username}
                        error={errors.username} onChange={this.onChange} placeholder='enter username'/>
                    <TextFieldGroup
                        label='Email' font="fa fa-envelope" name='email' value={email} error={errors.email}
                        onChange={this.onChange} placeholder='enter email'/>
                    <TextFieldGroup
                        label='Password' font="fa fa-lock" name='password' type='password' value={password}
                        error={errors.password} onChange={this.onChange} placeholder='enter password'/>
                    <TextFieldGroup
                        label='Confirm Password' font="fa fa-lock" name='repassword' type='password'
                        value={repassword} error={errors.repassword} onChange={this.onChange} placeholder='re-enter password'/>
                    <p className="lead">By signing up you are agreeing to these <Link to="">terms and conditons</Link>
                    </p>
                    <button type="submit" className="btn btn-outline-success" disabled={isLoading}>Sign Up</button>
                </form>
            </div>
        // <!--Form Section End-->
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
};