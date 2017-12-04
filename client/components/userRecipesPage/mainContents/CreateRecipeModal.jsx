import React, { Component } from 'react';


class CreateRecipeModal extends Component {
    render() {
        return (
            <div className="modal fade" id="createRecipeModal" tabIndex="-1" role="dialog" aria-labelledby="createRecipe" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="navbar-brand text-gray-dark">
                                <img src="/images/logo.png" width="45" height="32" className="d-inline-block align-center" alt=" More Recipe Logo"/>
                                <span id="site-name">More Recipes</span>
                            </span>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="fa fa-times-circle" aria-hidden="true"></i></span>
                            </button>
                        </div>
                        <form role="form" action="">
                        <div className="row">
                        <div className="col-sm-7 col-md-7 col-lg-7">
                            <div className="modal-body">
                                <div className="form-row text-muted">
                                    <div className="col p-1">
                                        <input type="text" className="form-control" placeholder="enter recipe title"/>
                                    </div>
                                    <h6 className="text-info p-2">Ingredients</h6>
                                    <div className="col p-1">
                                        <textarea rows="5" className="form-control" placeholder="enter recipe ingredients" aria-describedby="help"></textarea>
                                    </div>
                                    <small id="help" className="form-text text-warning text-left p-1"><i>Separate each ingredient with a comma</i></small>
                                    <h6 className="text-center text-info p-2">Procedures</h6>
                                    <div className="col p-1 mb-0">
                                        <textarea rows="5" className="form-control" placeholder="enter procedures or steps taken">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4 text-gray-dark mt-3">
                            <img src="/images/noimageyet.jpg" className="img-thumbnail img-fluid mb-3" alt="recipe image"/>
                            </div>
                            </div>
                            <div className="form-group text-gray-dark ml-3 p-1" >
                                <input type="file" className="form-control-file" placeholder="bgsttsts" value="Browse" id="imageFile" aria-describedby="fileHelp"/>
                                <small id="fileHelp" className="form-text text-warning text-left"><i>Maximum allowable image size is 3mb</i></small>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-info">Save Recipe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateRecipeModal;