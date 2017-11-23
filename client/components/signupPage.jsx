import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../actions/actionCreators/signupActions';
import { addFlashMessage } from '../actions/actionCreators/flashmessages';
import SiginSignupImage from './siginSignupImage.jsx';
import SignupForm from './signupPage/signupForm.jsx';
import Footer from './footer.jsx';

class SignupPage extends Component {
    render() {
        const { userSignupRequest, addFlashMessage } = this.props;
        return (
            <div>
                <div id="site-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
                            <div className="row">
                                <SiginSignupImage/>
                                <SignupForm userSignupRequest={ userSignupRequest } addFlashMessage={addFlashMessage}/>
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

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);