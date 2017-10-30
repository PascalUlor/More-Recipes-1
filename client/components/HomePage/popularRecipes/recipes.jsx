import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../../../public/images/*.png';

export default class Recipes extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-10 col-lg-10 offset-md-1 offset-lg-1">
                    <div className="card-deck mb-3 mt-3">
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card mb-4">
                                <img
                                    className="card-img-top img-fluid"
                                    src="images/food5.jpg"
                                    alt="Card image cap"/>
                                <div className="card-body pt-1 pb-2">
                                    <h5 className="card-title text-muted mt-2 text-center">Mexican Chunchy Bread</h5>
                                    <p className="text-muted w-100 text-center">
                                        <i className="fa fa-user text-info" aria-hidden="true"></i> Chinwoke Hyginus</p>
                                    <div className="card-text text-center">
                                        <small className="text-success pr-1">
                                            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 53</small>
                                        <Link
                                            to="./recipe_details.html"
                                            role="button"
                                            className="btn btn-outline-info btn-sm">
                                            <small><i className="fa fa-eye"></i> View</small>
                                        </Link>
                                        <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 5</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card mb-4">
                                <img
                                    className="card-img-top img-fluid"
                                    src="images/food2.jpg"
                                    alt="Card image cap"/>
                                <div className="card-body pt-1 pb-2">
                                    <h5 className="card-title text-muted mt-2 text-center">American Crunchy Burger</h5>
                                    <p className="text-muted w-100 text-center">
                                    <i className="fa fa-user text-info" aria-hidden="true"></i> Andalene Jane</p>
                                    <div className="card-text text-center">
                                        <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 47</small>
                                        <Link
                                            to="./recipe_details.html"
                                            role="button"
                                            className="btn btn-outline-info btn-sm">
                                            <small><i className="fa fa-eye"></i> View</small>
                                        </Link>
                                        <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 8</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card mb-4">
                                <img
                                    className="card-img-top img-fluid"
                                    src="images/food4.jpg"
                                    alt="Card image cap"/>
                                <div className="card-body pt-1 pb-2">
                                    <h5 className="card-title text-muted mt-2 text-center">Chinese Chicken Stew</h5>
                                    <p className="text-muted w-100 text-center">
                                    <i className="fa fa-user text-info" aria-hidden="true"></i> Myles Monroe</p>
                                    <div className="card-text text-center">
                                        <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                            42</small>
                                        <Link
                                            to="./recipe_details.html"
                                            role="button"
                                            className="btn btn-outline-info btn-sm">
                                            <small><i className="fa fa-eye"></i> View</small>
                                        </Link>
                                        <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 11</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card mb-4">
                                <img
                                    className="card-img-top img-fluid"
                                    src="images/food1.jpg"
                                    alt="Card image cap"/>
                                <div className="card-body pt-1 pb-2">
                                    <h5 className="card-title text-muted mt-2 text-center">Indian Tomato Sauce</h5>
                                    <p className="text-muted w-100 text-center">
                                        <i className="fa fa-user text-info" aria-hidden="true"></i> Rjah Rowland</p>
                                    <div className="card-text text-center">
                                        <small className="text-success pr-1">
                                            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                            35</small>
                                        <Link
                                            to="./recipe_details.html"
                                            role="button"
                                            className="btn btn-outline-info btn-sm">
                                            <small>
                                                <i className="fa fa-eye"></i>
                                                View</small>
                                        </Link>
                                        <small className="text-danger pl-1">
                                            <i className="fa fa-thumbs-o-down"></i>
                                            5</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card mb-4">
                                <img
                                    className="card-img-top img-fluid"
                                    src="images/food6.jpg"
                                    alt="Card image cap"/>
                                <div className="card-body pt-1 pb-2">
                                    <h5 className="card-title text-muted mt-2 text-center">Tasty Crab Salad</h5>
                                    <p className="text-muted w-100 text-center">
                                        <i className="fa fa-user text-info" aria-hidden="true"></i> Mary Jane</p>
                                    <div className="card-text text-center">
                                        <small className="text-success pr-1">
                                            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                            33</small>
                                        <Link
                                            to="./recipe_details.html"
                                            role="button"
                                            className="btn btn-outline-info btn-sm">
                                            <small>
                                                <i className="fa fa-eye"></i>
                                                View</small>
                                        </Link>
                                        <small className="text-danger pl-1">
                                            <i className="fa fa-thumbs-o-down"></i>
                                            7</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="card mb-4">
                                <img
                                    className="card-img-top img-fluid"
                                    src="images/food3.jpg"
                                    alt="Card image cap"/>
                                <div className="card-body pt-1 pb-2">
                                    <h5 className="card-title text-muted mt-2 text-center">French Spicy Fries</h5>
                                    <p className="text-muted w-100 text-center">
                                        <i className="fa fa-user text-info" aria-hidden="true"></i> Dennis Pogba</p>
                                    <div className="card-text text-center">
                                        <small className="text-success pr-1">
                                            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                            26</small>
                                        <Link
                                            to="./recipe_details.html"
                                            role="button"
                                            className="btn btn-outline-info btn-sm">
                                            <small>
                                                <i className="fa fa-eye"></i>
                                                View</small>
                                        </Link>
                                        <small className="text-danger pl-1">
                                            <i className="fa fa-thumbs-o-down"></i>
                                            5</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}