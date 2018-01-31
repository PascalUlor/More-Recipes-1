import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import FlashMessagesList from './flash/FlashMessagesList.jsx';
import MainContents from './dashboard/MainContents.jsx';
import Footer from './Footer.jsx';


class Dashboard extends Component {
	render() {
		return (
			<div className="bg-faded">
				<div>
					<NavBar/>
					<div className="main-wrapper text-center p-0">
						<FlashMessagesList/>
						<MainContents/>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Dashboard;