import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from 'react-md-spinner';
import TextFieldGroup from '../../common/TextFieldGroup.jsx';
import FlashMessage from '../FlashMessage.jsx';


/**
 * @description displays sign in form
 * @method SigninForm
 * 
 * @param { object } props - object of functions and user details state
 * 
 * @returns { jsx } jsx - renders SigninForm component
 */
const SigninForm = (props) => {
	const {
		username, password, errors, showWarning,
		isLoading, handleChange, handleFocus, handleSubmit
	} = props;
	return (
		<div className="col-8 col-sm-8 col-md-8 col-lg-8">
			<h2>Sign In</h2>
			<p className="lead">Don&#39;t have a More-Recipes account?
				<Link to="/signup">Sign Up</Link>
			</p>
			{
				showWarning &&
				<div className='alert alert-danger p-0 m-0 mb-3'>
					<FlashMessage/>
				</div> 
			}
			{
				errors.form &&
				<div className='alert alert-danger text-center'>
					{errors.form}
				</div>
			}
			<form role="form" onSubmit={handleSubmit}>
				<TextFieldGroup
					label='Username' font="fa fa-user" name='username' value={username}
					error={errors.username} onChange={handleChange}
					onFocus={handleFocus} placeholder='enter username'/>
				<TextFieldGroup
					label='Password' font="fa fa-lock" name='password'
					type='password' value={password} error={errors.password}
					onChange={handleChange} onFocus={handleFocus}
					placeholder='enter password'/>
				<button type="submit" className="btn btn-outline-success"
					disabled={isLoading}>
					Sign In {isLoading && <Spinner size={20} className="ml-2"/>}
				</button>
			</form>
		</div>
	);
};

SigninForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	errors: PropTypes.shape().isRequired,
	showWarning: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleFocus: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default SigninForm;
