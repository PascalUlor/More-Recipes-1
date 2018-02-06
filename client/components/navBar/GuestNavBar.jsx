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
          className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" to="/recipes">All Recipes</NavLink>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signin">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-button" to="/signup">Register</Link>
      </li>
    </ul>
  </div>
);

export default GuestNavBar;
