import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


/**
 * @description displays a single favorite recipe
 * @method FavoriteRecipe
 * 
 * @param { object } favorite - object of a single favorite recipe
 * @param { function } setCurrentRecipe - sets currently selected recipe
 * 
 * @returns { jsx } jsx - renders FavoriteRecipe component
 */
const FavoriteRecipe = ({ favorite, setCurrentRecipe }) => (
  <div className="col-12 col-sm-12 col-md-6 col-lg-4 pt-2">
    <div className="card">
      <Link to={`/recipes/${favorite.recipeId}/recipe-details`}>
        <img
          className="card-img-top img-fluid"
          src={favorite.Recipe.recipeImage}
          alt="Card image cap"/>
      </Link>
      <div className="card-body p-2">
        <h5 className="card-title mt-2">{favorite.Recipe.title}</h5>
        <p className="text-muted w-100">
          <i className="fa fa-user text-info" aria-hidden="true"></i>
            {favorite.Recipe.User.fullName}
        </p>
        <div>
          <Link to={`/recipes/${favorite.recipeId}/recipe-details`}
            className="btn btn-sm btn-outline-info mr-2">
            <i className="fa fa-eye" aria-hidden="true"></i> View
          </Link>
          <button type="button"
            className="btn btn-sm btn-outline-danger ml-2"
            data-toggle="modal"
            data-target="#deleteRecipeModal"
            onClick={() => setCurrentRecipe(favorite.recipeId)}>
            <i className="fa fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);


FavoriteRecipe.propTypes = {
  favorite: PropTypes.shape().isRequired,
  setCurrentRecipe: PropTypes.func.isRequired
};


export default FavoriteRecipe;
