import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addFlashMessage from '../actions/actionCreators/flashMessage';
import verifyToken from './verifyToken';

export default (ProtectedComponent) => {
	/**
	 * @description HOC for authenticating protected components
	 *
	 * @class Authenticate
	 *
	 * @extends Component
	 */
	class Authenticate extends Component {
		 /**
			* @description handles route authentication
			* 
			* @method componentDidMount
			*
			* @returns { * } null
			*/
		componentDidMount() {
			if (!verifyToken()) {
				this.props.addFlashMessage({
					type: 'failed',
					text: 'Sorry!!!. Please login to continue'
				});
				this.context.router.history.push('/signin');
			}
		}
		/**
		 * @description displays protected component
		 *
		 * @returns { jsx } jsx - protected components with their
		 * associated properties
		 */
		render() {
			return (
				<ProtectedComponent { ...this.props }/>
			);
		}
	}

Authenticate.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	addFlashMessage: PropTypes.func.isRequired
};

Authenticate.contextTypes = {
  router: PropTypes.shape().isRequired
};
/**
 * @description maps redux state to props
 *
 * @param { object } state - holds Authentication state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
	isAuthenticated: state.authenticatedUser.isAuthenticated
});

return connect(mapStateToProps, { addFlashMessage })(Authenticate);
};