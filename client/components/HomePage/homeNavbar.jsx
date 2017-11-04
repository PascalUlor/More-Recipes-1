import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
// import isEmpty from 'lodash/isEmpty';
import GuestNavBar from './homeNavBar/guestNavBar.jsx';
import UserNavBar from './homeNavBar/userNavBar.jsx';
import { logOutRequest } from '../../actions/actionCreators/logOutActions';

class HomeNavBar extends Component {
  handleLogOut(e) {
e.preventDefault();
this.props.logOutRequest();
  }
  render() {
    const { isAuthenticated, user } = this.props.authUser;
    let userName;
    if (jwt.decode(user) !== null) {
      userName = jwt.decode(user).username;
    } else {
      userName = '';
    }
    return (
      //  <!--Header Container Start -->
       <div className="container">
          <header>
            <nav className="navbar navbar-toggleable-md navbar-light">
              <button
                className="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                data-target="#navbarItems"
                aria-controls="navbarItems"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link className="navbar-brand" to="/">
                <img
                  src="/images/logo.png"
                  width="45"
                  height="32"
                  className="d-inline-block align-center"
                  alt="More Recipe Logo"/>
                <span id="site-name">More Recipes</span>
              </Link>
              { isAuthenticated ? <UserNavBar currentUsername={userName} logOut={this.handleLogOut.bind(this)}/> : <GuestNavBar/>}
            </nav>
          </header>
        </div>
    );
  }
}

HomeNavBar.propTypes = {
  authUser: PropTypes.object.isRequired,
  logOutRequest: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    authUser: state.authUser
   };
}

export default connect(mapStateToProps, { logOutRequest })(HomeNavBar);