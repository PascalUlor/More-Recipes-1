import React, { Component } from 'react';


class MyRecipes extends Component {
    render() {
        return (
            //  <!--Section For Main Div End-->
            <div className="col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1">
                <div className="card-deck mb-5 mt-3">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 pt-2">
                            <div className="card">
                                <img className="card-img-top" src="/images/food1.jpg" alt="Card image cap"/>
                                <div className="card-body p-2">
                                    <h5 className="card-title text-muted mt-2">Indian Tomato Sauce</h5>
                                    <div className="card-text">
                                        <small className="text-success pr-1">
                                            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 15
                                        </small>
                                        <button className="btn btn-outline-danger btn-sm mr-1" data-toggle="modal" data-target="#deleteRecipeModal">
                                            <small><i className="fa fa-trash"></i> Delete</small>
                                        </button>
                                        <button className="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#editRecipeModal">
                                            <small><i className="fa fa-edit"></i> Edit</small>
                                        </button>
                                        <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 5</small>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 pt-2">
                        <div className="card">
                            <img className="card-img-top" src="/images/food2.jpg" alt="Card image cap"/>
                            <div className="card-body p-2">
                                <h5 className="card-title text-muted mt-2">American Crunchy Burger</h5>
                                <div className="card-text">
                                    <small className="text-success pr-1">
                                        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 6
                                    </small>
                                    <button className="btn btn-outline-danger btn-sm mr-1" data-toggle="modal" data-target="#deleteRecipeModal">
                                        <small><i className="fa fa-trash"></i> Delete</small>
                                    </button>
                                    <button className="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#editRecipeModal">
                                        <small><i className="fa fa-edit"></i> Edit</small>
                                    </button>
                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 18</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 pt-2">
                        <div className="card">
                            <img className="card-img-top" src="/images/food3.jpg" alt="Card image cap"/>
                            <div className="card-body p-2">
                                <h5 className="card-title text-muted mt-2">French Spicy Fries</h5>
                                <div className="card-text">
                                    <small className="text-success pr-1">
                                        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 42
                                    </small>
                                    <button className="btn btn-outline-danger btn-sm mr-1" data-toggle="modal" data-target="#deleteRecipeModal">
                                        <small><i className="fa fa-trash"></i> Delete</small>
                                    </button>
                                    <button className="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#editRecipeModal">
                                        <small><i className="fa fa-edit"></i> Edit</small>
                                    </button>
                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 11</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyRecipes;