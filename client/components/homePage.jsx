import React, { Component } from 'react';
import HomeNavBar from './HomePage/homeNavbar.jsx';
import MainCover from './HomePage/mainCover.jsx';
import PopularRecipes from './HomePage/popularRecipes.jsx';
import Footer from './footer.jsx';

class Homepage extends Component {
	render() {
		return (
			<div>
				<div className="site-wrapper">
					<HomeNavBar/>
					<MainCover/>
					<PopularRecipes/>
				</div>
				<Footer id="homeFooter"/>
			</div>
		);
	}
}

export default Homepage;