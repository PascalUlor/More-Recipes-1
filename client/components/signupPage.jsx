import React, { Component } from 'react';
import SiginSignupImage from './siginSignupImage.jsx';
import SignupForm from './signupPage/signupForm.jsx';
import Footer from './footer.jsx';

export default class App extends Component {
    render() {
        return (
            <div>
                <div id="site-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
                            <div className="row">
                                <SiginSignupImage/>
                                <SignupForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <Footer id="homeFooter"/>
            </div>
        );
    }
}