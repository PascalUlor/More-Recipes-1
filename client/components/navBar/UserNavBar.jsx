import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const UserNavBar = ({ currentUsername, logOut }) => (
  <div className="collapse navbar-collapse text-center" id="navbarItems">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" to="/dashboard">Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" to="/user/recipes">My Recipes
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" to="/user/favorites">Favorites
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeStyle={{
            backgroundColor: 'whitesmoke', fontWeight: '600', color: 'darkcyan'
          }}
          className="nav-link" to="/recipes">All Recipes
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
        <Link className="dropdown-item" to="/user/profile">Profile</Link>
        <Link className="dropdown-item" to="">Settings</Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="#" onClick={logOut}>Log Out</Link>
      </div>
    </div>
  </div>
);

UserNavBar.propTypes = {
  currentUsername: PropTypes.string,
  logOut: PropTypes.func.isRequired
};

export default UserNavBar;