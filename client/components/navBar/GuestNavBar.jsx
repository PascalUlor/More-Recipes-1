import React from 'react';
import { Link, NavLink } from 'react-router-dom';


/**
 * @description displays non-authenticated user's navigation bar
 * @method GuestNavBar
 *
 * @returns { jsx } jsx - renders GuestNavBar component
 */
const GuestNavBar = () => (
  <div className="collapse navbar-collapse" id="navbarItems">
    <ul className="navbar-nav ml-auto text-center">
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" id="home" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" id="all-recipes" to="/recipes">All Recipes
        </NavLink>
      </li>
      <li className="nav-item">
        <Link className="nav-link" id="signin" to="/signin">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-button" id="signup"to="/signup">Register
        </Link>
      </li>
    </ul>
  </div>
);

export default GuestNavBar;
