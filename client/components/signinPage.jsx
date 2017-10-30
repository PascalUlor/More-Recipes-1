import React, { Component } from 'react';
import SiginSignupImage from './siginSignupImage.jsx';
import SigninForm from './signinPage/signinForm.jsx';
import Footer from './footer.jsx';

export default class SigninPage extends Component {
    render() {
        return (
            <div>
                <div id="site-wrapper">
                    <div className="container-fluid mt-4">
                        <div className="row">
                            <div className="col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
                                <div className="row">
                                    <SiginSignupImage/>
                                    <SigninForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer id="footer"/>
            </div>
        );
    }
}