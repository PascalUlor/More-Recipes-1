import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSigninRequest } from '../actions/actionCreators/signinActions';
import { addFlashMessage } from '../actions/actionCreators/flashmessages';
import SiginSignupImage from './siginSignupImage.jsx';
import SigninForm from './signinPage/signinForm.jsx';
import Footer from './footer.jsx';

class SigninPage extends Component {
    render() {
        const { userSigninRequest, addFlashMessage } = this.props;
        return (
            <div>
                <div id="site-wrapper">
                    <div className="container-fluid mt-4">
                        <div className="row">
                            <div className="col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
                                <div className="row">
                                    <SiginSignupImage/>
                                    <SigninForm userSigninRequest={ userSigninRequest } addFlashMessage={addFlashMessage}/>
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

SigninPage.propTypes = {
    userSigninRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, { userSigninRequest, addFlashMessage })(SigninPage);