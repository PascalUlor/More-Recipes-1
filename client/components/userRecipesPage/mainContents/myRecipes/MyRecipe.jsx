import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


/**
 * @description displays a single user recipe
 * @method MyRecipe
 * 
 * @param { object } myRecipe - object of single user recipe
 * @param { function } setCurrentRecipe - sets currently selected recipe
 * 
 * @returns { jsx } jsx - render MyRecipe component
 */
const MyRecipe = ({ myRecipe, setCurrentRecipe }) => (
  <div className="col-12 col-sm-6 col-md-6 col-lg-4 pt-2">
    <div className="card">
      <Link to={`/recipes/${myRecipe.id}/recipe-details`}>
        <img
          className="card-img-top img-fluid"
          src={myRecipe.recipeImage}
          alt="Card image cap"/>
      </Link>
      <div className="card-body text-center p-2">
        <div className="row card-title">
        <h6 className="col-9 mt-2 text-truncate">{myRecipe.title}</h6>
          <small className="col-3 mt-2">
            <i className="fa fa-eye"></i> {myRecipe.viewsCount}
          </small>
        </div>
        <div className="card-text">
          <small className="text-success pr-1">
            <i className="fa fa-thumbs-o-up" aria-hidden="true">
            </i> {myRecipe.upvotes}
          </small>
          <button className="btn btn-outline-danger btn-sm mr-1"
            onClick={() => setCurrentRecipe(myRecipe.id)}
            data-toggle="modal" data-target="#deleteRecipeModal">
            <small><i className="fa fa-trash"></i> Delete</small>
          </button>
          <button className="btn btn-outline-success btn-sm"
            onClick={() => setCurrentRecipe(myRecipe.id)}
            data-toggle="modal" data-target="#editRecipeModal">
            <small><i className="fa fa-edit"></i> Edit</small>
          </button>
          <small className="text-danger pl-1">
            <i className="fa fa-thumbs-o-down"></i> {myRecipe.downvotes}
          </small>
        </div>
      </div>
    </div>
  </div>
);

MyRecipe.propTypes = {
  myRecipe: PropTypes.shape().isRequired,
  setCurrentRecipe: PropTypes.func.isRequired
};

export default MyRecipe;
