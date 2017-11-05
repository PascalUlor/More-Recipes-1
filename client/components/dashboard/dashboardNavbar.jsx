import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardNavBar extends Component {
    render() {
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
                                    <Link className="nav-link" to="./my_recipes.html">My Recipes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="./favorites.html">Favorites</Link>
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
                                    <span className="beautify">Chyke</span>
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="./profile.html">View Profile</Link>
                                    <Link className="dropdown-item" to="#">Settings</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="#">Log Out</Link>
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

export default DashboardNavBar;