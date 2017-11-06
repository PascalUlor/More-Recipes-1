import React, { Component } from 'react';
import DashboardNavBar from './dashboard/dashboardNavbar.jsx';
import FlashMessagesList from './flash/flashMessagesList.jsx';
import MainContents from './dashboard/mainContents.jsx';
import Footer from './footer.jsx';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <DashboardNavBar/>
                <FlashMessagesList/>
                <MainContents/>
                <Footer id='footer'/>
            </div>
        );
    }
}

export default Dashboard;