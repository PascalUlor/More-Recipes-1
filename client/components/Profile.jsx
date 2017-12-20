import React, { Component } from 'react';
import DashboardNavBar from './dashboard/dashboardNavbar.jsx';
import ProfileImage from './profile/ProfileImage.jsx';
import ProfileForm from './profile/ProfileForm.jsx';
import Footer from './footer.jsx';

class Profile extends Component {
    render() {
        return (
            <div>
                <DashboardNavBar/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
                            <div className="row">
                                <ProfileImage/>
                                <ProfileForm/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer id="homeFooter"/>
            </div>
        );
    }
}

export default Profile;