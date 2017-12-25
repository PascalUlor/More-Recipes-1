import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deleteRecipeRequest from '../../actions/actionCreators/deleteRecipeActions';


class Index extends Component {
handleClick() {
    this.props.deleteRecipeRequest(this.props.recipeId, () => {
        if (this.props.deleteRecipeSuccess !== '') {
            $('button[id=close]').click();
            toastr.clear();
            toastr.success(this.props.deleteRecipeSuccess);
        } else if (this.props.deleteRecipeError !== '') {
            $('button[id=close]').click();
            toastr.clear();
            toastr.error(this.props.deleteRecipeError);
        }
    });
}
    render() {
        return (
            <div className="modal fade" id="deleteRecipeModal" tabIndex="-1" role="dialog" aria-labelledby="deleteRecipe" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="navbar-brand text-gray-dark">
                                <img src="/images/logo.png" width="45" height="32" className="d-inline-block align-center" alt=" Make Recipe Logo"/>
                                <span id="site-name">More Recipes</span>
                            </span>
                            <button type="button" id="close" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="fa fa-times-circle" aria-hidden="true"></i></span>
                            </button>
                        </div>
                        <div className="modal-body text-muted text-left">
                            <div className="container-fluid">Are you sure of deleting this recipe?</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={this.handleClick.bind(this)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    recipeId: PropTypes.number.isRequired,
    deleteRecipeRequest: PropTypes.func.isRequired,
    deleteRecipeSuccess: PropTypes.string,
    deleteRecipeError: PropTypes.string
};

const mapStateToProps = state => ({
    recipeId: state.setRecipeId.currentSetRecipeId,
    deleteRecipeSuccess: state.deleteUserRecipe.deleteRecipeSuccess,
    deleteRecipeError: state.deleteUserRecipe.deleteRecipeError
});

export default connect(mapStateToProps, { deleteRecipeRequest })(Index);
