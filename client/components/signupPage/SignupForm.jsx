import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from 'react-md-spinner';
import TextFieldGroup from '../../common/textFieldGroup.jsx';

const SignupForm = (props) => {
  const {
    fullName, username, email, password, repassword,
    errors, isLoading, handleChange, handleFocus, handleSubmit
  } = props;
  return (
    <div className="col-8 col-sm-8 col-md-8 col-lg-8">
      <h2>Sign Up</h2>
      <p className="lead">Already have a More-Recipes account? <Link to="/signin">Sign In</Link></p>
      <form role="form" onSubmit={handleSubmit} className="pb-2">
        <TextFieldGroup
          label='Full Name' font="fa fa-user" name='fullName'
          value={fullName} error={errors.fullName} onChange={handleChange}
          onFocus={handleFocus} placeholder='enter full name'/>
        <TextFieldGroup
          label='Username' font="fa fa-user" name='username'
          value={username} error={errors.username} onChange={handleChange}
          onFocus={handleFocus} placeholder='enter username'/>
        <TextFieldGroup
          label='Email' font="fa fa-envelope" name='email' value={email}
          error={errors.email} onChange={handleChange}
          onFocus={handleFocus} placeholder='enter email'/>
        <TextFieldGroup
          label='Password' font="fa fa-lock" name='password' type='password' value={password}
          error={errors.password} onChange={handleChange}
          onFocus={handleFocus} placeholder='enter password'/>
        <TextFieldGroup
          label='Confirm Password' font="fa fa-lock" name='repassword' type='password'
          value={repassword} error={errors.repassword} onChange={handleChange}
          onFocus={handleFocus} placeholder='re-enter password'/>
        <button type="submit" className="btn btn-outline-success" disabled={isLoading}>
          Sign Up {isLoading && <Spinner size={20} className="ml-2"/>}
        </button>
      </form>
    </div>
  );
};

SignupForm.propTypes = {
  fullName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  repassword: PropTypes.string.isRequired,
	errors: PropTypes.shape().isRequired,
	isLoading: PropTypes.bool.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleFocus: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default SignupForm;