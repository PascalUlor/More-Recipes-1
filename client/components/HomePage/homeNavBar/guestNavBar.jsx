import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GuestNavBar extends Component {
    render() {
        return (
            <div className="collapse navbar-collapse" id="navbarItems">
                <ul className="navbar-nav mr-auto text-center">
                    <li className="nav-item active">
                        <Link className="nav-link" style={{ color: 'skyblue' }}
                            to="/">Home<span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/recipes">All Recipes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Register</Link>
                    </li>
                </ul>
                <form className="form-inline form-group my-2 my-lg-0">
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
            </div>
        );
    }
}

export default GuestNavBar;