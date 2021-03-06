import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';


/**
 * @description displays authenticated user's navigaton bar
 * @method UserNavBar
 *
 * @param { string } currentUsername - username of current logged in user
 * @param { function } logOut - logs/signs out users
 *
 * @returns { jsx } jsx - renders UserNavBar component
 */
const UserNavBar = ({ currentUsername, logOut }) => (
  <div className="collapse navbar-collapse text-center" id="navbarItems">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" id="dashboard" to="/dashboard">Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" id="my-recipes" to="/user/recipes">My Recipes
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" id="favorites" to="/user/favorites">Favorites
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" id="all-recipes" to="/recipes">All Recipes
        </NavLink>
      </li>
    </ul>
    <div className="btn-group ml-auto">
      <button
        type="button"
        className="btn dropdown-toggle nav-button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <span className="beautify">{currentUsername}</span>
      </button>
      <div className="dropdown-menu dropdown-menu-right">
        <Link
          className="dropdown-item" id="profile"
          to="/user/profile">Profile
        </Link>
        <Link
          className="dropdown-item" id="settings"
          to="">Settings</Link>
        <div className="dropdown-divider"></div>
        <Link
          className="dropdown-item" id="logout"
          to="#" onClick={logOut}>Log Out</Link>
      </div>
    </div>
  </div>
);

UserNavBar.propTypes = {
  currentUsername: PropTypes.string,
  logOut: PropTypes.func.isRequired
};

export default UserNavBar;
