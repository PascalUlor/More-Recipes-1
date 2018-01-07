import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FavoriteRecipesList = ({ favorites }) => (
  favorites.map(favorite =>
  <div className="col-12 col-sm-12 col-md-6 col-lg-4 pt-2" key={favorite.id}>
    <div className="card">
      <Link to={`/recipes/${favorite.recipeId}/recipe-details`}>
        <img
          className="card-img-top img-fluid" style={{ width: '100%', height: '200px' }}
          src={favorite.Recipe.recipeImage}
          alt="Card image cap"/>
      </Link>
      <div className="card-body p-2">
        <h5 className="card-title text-muted mt-2">{favorite.Recipe.title}</h5>
        <p className="text-muted w-100 text-center">
          <i className="fa fa-user text-info" aria-hidden="true"></i> {favorite.Recipe.User.fullName}
        </p>
        <div>
          <Link to={`/recipes/${favorite.recipeId}/recipe-details`} className="btn btn-sm btn-outline-info mr-2"><i className="fa fa-eye" aria-hidden="true"></i> View</Link>
          <button type="button" className="btn btn-sm btn-outline-danger ml-2"><i className="fa fa-trash"></i> Delete</button>
        </div>
      </div>
    </div>
  </div>)
);

FavoriteRecipesList.propTypes = {
  favorites: PropTypes.array.isRequired
};

export default FavoriteRecipesList;
