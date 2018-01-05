import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import logOutRequest from '../../actions/actionCreators/logOutActions';

class DashboardNavBar extends Component {
    constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut(e) {
    e.preventDefault();
    logOutRequest();
    this.context.router.history.push('/');
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
        const { username } = this.state;
        return (
            <div className="container">
                <header>
                    {/* <!--Site Navigation Start --> */}
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
                                alt=" Make Recipe Logo"/>
                            <span id="site-name">More Recipes</span>
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarItems">
                            <form className="form-inline form-group my-2 my-lg-0 ml-auto">
                                <div className="input-group">
                                    <input
                                        className="form-control form-control-sm"
                                        type="text"
                                        placeholder="search recipe by name"/>
                                    <span className="input-group-btn">
                                        <button type="submit" className=" btn btn-md btn-outline-info">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/recipes">My Recipes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/favorites">Favorites</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/recipes">All Recipes</Link>
                                </li>
                            </ul>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-outline-info dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <span className="beautify">{ username }</span>
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/user/profile">View Profile</Link>
                                    <Link className="dropdown-item" to="#">Settings</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick= { this.handleLogOut }>
                                        Log Out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {/* <!--Site Navigation End--> */}
                </header>
                {/* <!--Header Container End --> */}
            </div>
        );
    }
}

DashboardNavBar.contextTypes = {
    router: PropTypes.object.isRequired
};


export default DashboardNavBar;