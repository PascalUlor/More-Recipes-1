import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import setCurrentRecipeRequest from '../../../../actions/actionCreators/setCurrentRecipeActions';

class MyRecipe extends Component {
    handleSetCurrentRecipe() {
        this.props.setCurrentRecipeRequest(this.props.myRecipe.id);
    }
    render() {
        return (
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 pt-2">
                <div className="card">
                    <Link to={`recipes/${this.props.myRecipe.id}/recipe-details`}>
                        <img
                            className="card-img-top img-fluid" style={{ width: '100%', height: '200px' }}
                            src={this.props.myRecipe.recipeImage}
                            alt="Card image cap"/>
                    </Link>
                    <div className="card-body p-2">
                        <h6 className="card-title text-muted mt-2">{this.props.myRecipe.title}
                            <small className="float-right"><i className="fa fa-eye"></i> {this.props.myRecipe.viewsCount}</small>
                        </h6>
                        <div className="card-text">
                            <small className="text-success pr-1">
                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {this.props.myRecipe.upvotes}
                            </small>
                            <button className="btn btn-outline-danger btn-sm mr-1" onClick={this.handleSetCurrentRecipe.bind(this)} data-toggle="modal" data-target="#deleteRecipeModal">
                                <small><i className="fa fa-trash"></i> Delete</small>
                            </button>
                            <button className="btn btn-outline-success btn-sm" onClick={this.handleSetCurrentRecipe.bind(this)} data-toggle="modal" data-target="#editRecipeModal">
                                <small><i className="fa fa-edit"></i> Edit</small>
                            </button>
                            <small className="text-danger pl-1">
                                <i className="fa fa-thumbs-o-down"></i> {this.props.myRecipe.downvotes}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MyRecipe.propTypes = {
    myRecipe: PropTypes.object.isRequired,
    setCurrentRecipeRequest: PropTypes.func
};

export default connect(null, { setCurrentRecipeRequest })(MyRecipe);