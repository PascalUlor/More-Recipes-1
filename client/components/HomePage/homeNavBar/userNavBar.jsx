import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class UserNavBar extends Component {
    render() {
        return (
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
                        <Link className="nav-link" to="./index.html">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="./recipes_list.html">My Recipes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="./favourites.html">Favorites</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="./recipes_list.html">All Recipes</Link>
                    </li>
                </ul>
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-outline-info dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <span className="beautify">{this.props.currentUsername}</span>
                    </button>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="./profile.html">View Profile</Link>
                        <Link className="dropdown-item" to="#">Settings</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="#" onClick={this.props.logOut}>Log Out</Link>
                    </div>
                </div>
            </div>
        );
    }
}

UserNavBar.propTypes = {
    currentUsername: PropTypes.string,
    logOut: PropTypes.func.isRequired
};

export default UserNavBar;