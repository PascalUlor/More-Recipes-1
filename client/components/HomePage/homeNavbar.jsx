import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import GuestNavBar from './homeNavBar/guestNavBar.jsx';
import UserNavBar from './homeNavBar/userNavBar.jsx';
import { logOutRequest } from '../../actions/actionCreators/logOutActions';

class HomeNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }
  handleLogOut(e) {
    e.preventDefault();
    this.props.logOutRequest();
  }
  componentDidMount() {
    const userDecodedInfo = jwt.decode(localStorage.getItem('jwtToken'));
    if (localStorage.getItem('jwtToken') && userDecodedInfo !== null) {
      this.setState({ username: userDecodedInfo.username });
    } else {
      this.setState({ username: '' });
    }
  }
  render() {
    const { username } = this.state,
      { isAuthenticated } = this.props.authUser;
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
              { isAuthenticated ? <UserNavBar currentUsername={username} logOut={this.handleLogOut.bind(this)}/> : <GuestNavBar/>}
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