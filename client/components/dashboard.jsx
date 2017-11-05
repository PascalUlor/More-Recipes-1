import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DashboardNavBar from './dashboard/dashboardNavbar.jsx';
import MainContents from './dashboard/mainContents.jsx';
import Footer from './footer.jsx';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <DashboardNavBar/>
                <MainContents/>
                <Footer id='footer'/>
            </div>
        );
    }
}

export default Dashboard;