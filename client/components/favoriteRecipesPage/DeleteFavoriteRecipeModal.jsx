import React from 'react';
import PropTypes from 'prop-types';


const DeleteFavoriteRecipeModal = ({ handleDelete }) => (
  <div className="modal fade" id="deleteFavoriteRecipeModal" tabIndex="-1" role="dialog" aria-labelledby="deleteFavoriteRecipe" aria-hidden="true">
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
          <div className="container-fluid">Are you sure of unfavoriting this recipe?</div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
);

DeleteFavoriteRecipeModal.propTypes = {
    handleDelete: PropTypes.func.isRequired
};

export default DeleteFavoriteRecipeModal;
