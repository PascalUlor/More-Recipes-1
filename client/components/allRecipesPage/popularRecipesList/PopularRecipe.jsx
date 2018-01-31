import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const PopularRecipe = ({ popularRecipe }) => (
  <li className="list-group-item">
    <h5 className="text-muted text-center w-100 p-1">{popularRecipe.title}</h5>
    <p className="text-muted w-100 text-center">
      <i className="fa fa-user text-info" aria-hidden="true"></i> {popularRecipe.User.fullName}
    </p>
    <div className="text-center w-100">
      <small className="text-success pr-1">
        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {popularRecipe.upvotes}
      </small>
      <Link to={`recipes/${popularRecipe.id}/recipe-details`} role="button" className="btn btn-outline-info btn-sm">
        <small>View</small>
      </Link>
      <small className="text-danger pl-1">
        <i className="fa fa-thumbs-o-down" aria-hidden="true"></i> {popularRecipe.downvotes}
      </small>
    </div>
  </li>
);

PopularRecipe.propTypes = {
  popularRecipe: PropTypes.shape().isRequired
};

export default PopularRecipe;
