import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar.jsx';
import MainCover from './homePage/MainCover.jsx';
import PopularRecipes from './homePage/PopularRecipes.jsx';
import Footer from './Footer.jsx';
import verifyToken from '../utils/verifyToken';

class Homepage extends Component {
	componentWillMount() {
		if (verifyToken()) {
			this.context.router.history.push('/dashboard');
		}
	}
	render() {
		return (
			<div className="bg-faded">
				<div className="site-wrapper">
					<NavBar/>
					<MainCover/>
					<PopularRecipes/>
				</div>
				<Footer/>
			</div>
		);
	}
}

Homepage.contextTypes = {
  router: PropTypes.shape().isRequired
};

export default Homepage;