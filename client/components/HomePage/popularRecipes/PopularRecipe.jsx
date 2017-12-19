import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PopularRecipe extends Component {
    render() {
        return (
            <div className="col-sm-6 col-md-6 col-lg-4">
                <div className="card mb-4">
                    <Link to={`/user/recipes/${this.props.popularRecipe.id}/recipe-details`}>
                        <img
                            className="card-img-top img-fluid" style={{ width: '100%', height: '200px' }}
                            src={this.props.popularRecipe.recipeImage}
                            alt="Card image cap"/>
                    </Link>
                    <div className="card-body pt-1 pb-2">
                        <h5 className="card-title text-muted mt-2 text-center">{this.props.popularRecipe.title}</h5>
                        <p className="text-muted w-100 text-center">
                            <i className="fa fa-user text-info" aria-hidden="true"></i> {this.props.popularRecipe.User.fullName}</p>
                        <div className="card-text text-center">
                            <small className="text-success pr-1">
                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 
                                  {this.props.popularRecipe.upvotes}
                            </small>
                            <Link
                                to="/user/recipes/recipe-details"
                                role="button"
                                className="btn btn-outline-info btn-sm">
                                <small><i className="fa fa-eye"></i>
                                  {this.props.popularRecipe.viewsCount}
                                </small>
                            </Link>
                            <small className="text-danger pl-1">
                                <i className="fa fa-thumbs-o-down"></i>
                                  {this.props.popularRecipe.downvotes}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PopularRecipe.propTypes = {
    popularRecipe: PropTypes.object.isRequired
};

export default PopularRecipe;