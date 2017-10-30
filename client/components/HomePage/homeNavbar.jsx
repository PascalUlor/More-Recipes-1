import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomeNavBar extends Component {
  render() {
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

              <div className="collapse navbar-collapse" id="navbarItems">
                <ul className="navbar-nav mr-auto text-center">
                  <li className="nav-item active">
                    <Link className="nav-link" style={{ color: 'skyblue' }} to="/">Home<span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/api/v1/user/signin">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/api/v1/user/signup">Register</Link>
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
            </nav>
          </header>
        </div>
    );
  }
}