import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/actionCreators/flashmessages';

export default (ProtectedComponent) => {
	class Authenticate extends Component {
		componentWillMount() {
			if (!this.props.isAuthenticated) {
				this.props.addFlashMessage({
					type: 'failed',
					text: 'You are logged out. Login to continue'
				});
				this.context.router.history.push('/signin');
			}
		}

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
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		isAuthenticated: state.authUser.isAuthenticated
	};
}

return connect(mapStateToProps, { addFlashMessage })(Authenticate);
};