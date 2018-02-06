import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


/**
 * @description renders a recipe from all recipes list
 * @method AllRecipe
 * 
 * @param { object } allRecipe - object of a single recipe
 * 
 * @returns { jsx } jsx - displays AllRecipe component
 */
const AllRecipe = ({ allRecipe }) => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="card mb-4">
      <Link to={`recipes/${allRecipe.id}/recipe-details`}>
        <img className="card-img-top img-fluid"
          src={allRecipe.recipeImage} alt="Card image cap"/>
      </Link>
      <div className="card-body text-center pt-1 pb-2">
        <h6 className="card-title mt-2">{allRecipe.title}
          <small className="float-right pr-2">
            <i className="fa fa-eye"></i> {allRecipe.viewsCount}
          </small>
        </h6>
        <p className="text-muted w-100">
          <i className="fa fa-user text-info" aria-hidden="true">
          </i> {allRecipe.User.fullName}
        </p>
        <div className="card-text">
          <small className="text-success pr-1">
            <i className="fa fa-thumbs-o-up" aria-hidden="true">
            </i> {allRecipe.upvotes}
          </small>
          <Link to={`recipes/${allRecipe.id}/recipe-details`}
            role="button" className="btn btn-outline-info btn-sm">
            <small>View</small>
          </Link>
          <small className="text-danger pl-1">
            <i className="fa fa-thumbs-o-down" aria-hidden="true">
            </i> {allRecipe.downvotes}
          </small>
        </div>
      </div>
    </div>
  </div>
);

AllRecipe.propTypes = {
  allRecipe: PropTypes.object.isRequired
};

export default AllRecipe;
