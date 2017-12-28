import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AllRecipe = ({ allRecipe }) => (
    <div className="col-12 col-md-6 col-lg-4">
        <div className="card mb-4">
            <Link to={`recipes/${allRecipe.id}/recipe-details`}>
                <img
                    className="card-img-top img-fluid" style={{ width: '100%', height: '10em' }}
                    src={allRecipe.recipeImage}
                    alt="Card image cap"/>
            </Link>
            <div className="card-body pt-1 pb-2">
                <h6 className="card-title text-muted mt-2">{allRecipe.title}
                    <small className="float-right pr-2"><i className="fa fa-eye"></i> {allRecipe.viewsCount}</small>
                </h6>
                <p className="text-muted w-100 text-center">
                    <i className="fa fa-user text-info" aria-hidden="true"></i> {allRecipe.User.fullName}
                </p>
                <div className="card-text">
                    <small className="text-success pr-1">
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {allRecipe.upvotes}
                    </small>
                    <Link to={`recipes/${allRecipe.id}/recipe-details`} role="button" className="btn btn-outline-info btn-sm">
                        <small>View</small>
                    </Link>
                    <small className="text-danger pl-1">
                        <i className="fa fa-thumbs-o-down" aria-hidden="true"></i> {allRecipe.downvotes}
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
