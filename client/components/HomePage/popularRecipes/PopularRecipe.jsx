import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PopularRecipe = ({ popularRecipe }) => (
  <div className="col-sm-6 col-md-6 col-lg-4">
    <div className="card mb-4">
      <Link to={`recipes/${popularRecipe.id}/recipe-details`}>
        <img
          className="card-img-top img-fluid" style={{ width: '100%', height: '200px' }}
          src={popularRecipe.recipeImage}
          alt="Card image cap"/>
      </Link>
      <div className="card-body pt-1 pb-2">
        <h5 className="card-title mt-2 text-center">{popularRecipe.title}</h5>
        <p className="text-muted w-100 text-center">
          <i className="fa fa-user text-info" aria-hidden="true"></i> {popularRecipe.User.fullName}</p>
        <div className="card-text text-center">
          <small className="text-success pr-1">
            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
              {popularRecipe.upvotes}
          </small>
          <Link
            to={`/recipes/${popularRecipe.id}/recipe-details`}
            role="button"
            className="btn btn-outline-info btn-sm">
            <small><i className="fa fa-eye"></i>
              {popularRecipe.viewsCount}
            </small>
          </Link>
          <small className="text-danger pl-1">
            <i className="fa fa-thumbs-o-down"></i>
              {popularRecipe.downvotes}
          </small>
        </div>
      </div>
    </div>
  </div>
);

PopularRecipe.propTypes = {
  popularRecipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    recipeImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    User: PropTypes.shape({
      fullName: PropTypes.string.isRequired
    }),
    upvotes: PropTypes.number.isRequired,
    viewsCount: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired
  }).isRequired
};

export default PopularRecipe;