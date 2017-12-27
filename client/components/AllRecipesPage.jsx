import React, { Component } from 'react';

class AllRecipesPage extends Component {
    render() {
        return (
            // <!--Entire Site Wrapper Start-->
            <div className="site-wrapper">
                {/* <!--Header Container Start --> */}
                <div className="container">
                    <header>
                        {/* <!--Site Navigation Start --> */}
                        <nav className="navbar navbar-toggleable-md navbar-light">
                            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <a className="navbar-brand" href="./index.html">
                                <img src="/images/logo.png" width="45" height="32" className="d-inline-block align-center" alt=" Make Recipe Logo"/> <span id="site-name">More Recipes</span>
                            </a>

                            <div className="collapse navbar-collapse" id="navbarItems">
                                <form className="form-inline form-group my-2 my-lg-0 ml-auto">
                                    <div className="input-group">
                                        <input className="form-control form-control-sm" type="text" placeholder="search recipe by name"/>
                                        <span className="input-group-btn">
                                            <button type="submit" className=" btn btn-md btn-outline-info">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </form>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="./index.html">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="./my_recipes.html">My Recipes</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="./favorites.html">Favourites</a>
                                    </li>
                                </ul>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-outline-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="beautify">Chike</span>
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="./profile.html">View Profile</a>
                                        <a className="dropdown-item" href="#">Settings</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Log Out</a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        {/* <!--Site Navigation End--> */}
                    </header>

                {/* <!--Main Div Start--> */}
                <main id="main-wrapper">
                    <div className="col">
                        <section className="cover text-center mb-3">
                            <h3 className="text-info">All Recipes</h3>
                            <hr id="favorites"/>
                        </section>
                        {/* <!--Section For Main Div End--> */}
                        <div className="row">
                            <div className="col-sm-7 col-md-9 col-lg-9">
                                <div className="card-deck mb-3 mt-3">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card mb-4">
                                            <img className="card-img-top img-fluid" src="/images/food1.jpg" alt="Card image cap"/>
                                            <div className="card-body pt-1 pb-2">
                                                <h5 className="card-title text-muted mt-2">Indian Tomato Sauce</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Chinwoke Hyginus</p>
                                                <div className="card-text">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 150</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 5</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card mb-4">
                                            <img className="card-img-top img-fluid" src="/images/food2.jpg" alt="Card image cap"/>
                                            <div className="card-body pt-1 pb-2">
                                                <h5 className="card-title text-muted mt-2">American Crunchy Burger</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Andalene Jane</p>
                                                <div className="card-text">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 6</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 18</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card mb-4">
                                            <img className="card-img-top img-fluid" src="/images/food3.jpg" alt="Card image cap"/>
                                            <div className="card-body pt-1 pb-2">
                                                <h5 className="card-title text-muted mt-2">French Spicy Fries</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Myles Monroe</p>
                                                <div className="card-text">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 42</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 11</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card mb-4">
                                            <img className="card-img-top img-fluid" src="/images/food4.jpg" alt="Card image cap"/>
                                            <div className="card-body pt-1 pb-2">
                                                <h5 className="card-title text-muted mt-2">Chinese Chicken Stew</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Rjah Rowland</p>
                                                <div className="card-text">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 15</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 5</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card mb-4">
                                            <img className="card-img-top img-fluid" src="/images/food5.jpg" alt="Card image cap"/>
                                            <div className="card-body pt-1 pb-2">
                                                <h5 className="card-title text-muted mt-2">Mexican Chunchy Bread</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Chinwoke Hyginus</p>
                                                <div className="card-text">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 6</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 18</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card mb-4">
                                            <img className="card-img-top img-fluid" src="/images/food6.jpg" alt="Card image cap"/>
                                            <div className="card-body pt-1 pb-2">
                                                <h5 className="card-title text-muted mt-2">Tasty Crab Salad</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Mary Jane
                                                </p>
                                                <div className="card-text">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 42</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 11</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!--Pagination Start--> */}
                                <nav aria-label="Page navigation" style={{ margin: '-1rem 0 2rem 0' }}>
                                    <ul className="pagination mb-2 ml-3">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">1</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">2</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">3</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">4</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                {/* <!--Pagination End--> */}
                            </div>
                            <div className="col-sm-5 col-md-3 col-lg-3">
                                <h6 className="card-title text-info mt-2">Popular Recipes</h6>
                                <div className="card">
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush mb-2">
                                            <li className="list-group-item mt-0">
                                                <h5 className="text-muted text-center w-100 p-1">French Spicy Fries</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Chinwoke Hyginus</p>
                                                <div className="text-center w-100">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 67</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 2</small>
                                                </div>
                                            </li>
                                            <li className="list-group-item">
                                                <h5 className="text-muted text-center w-100 p-1">African Tomato Stew</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Victoria Pepple</p>
                                                <div className="text-center w-100">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 51</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 3</small>
                                                </div>
                                            </li>
                                            <li className="list-group-item">
                                                <h5 className="text-muted text-center w-100 p-1">Indian Tasty Spag</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Ederson James</p>
                                                <div className="text-center w-100">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 40</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 5</small>
                                                </div>
                                            </li>
                                            <li className="list-group-item">
                                                <h5 className="text-muted text-center w-100 p-1">Tasty Crab Salad</h5>
                                                <p className="text-muted w-100 text-center"><i className="fa fa-hand-o-right text-info" aria-hidden="true"></i> Mary Jane</p>
                                                <div className="text-center w-100">
                                                    <small className="text-success pr-1"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 37</small>
                                                    <a href="./recipe_details.html" role="button" className="btn btn-outline-info btn-sm"><small><i className="fa fa-eye"></i> View</small></a>
                                                    <small className="text-danger pl-1"><i className="fa fa-thumbs-o-down"></i> 2</small>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* <!--Main Div End--> */}
                </div>

                {/* <!--Page Footer Start--> */}
                <footer id="copyright">
                    <hr/>
                    <div className="container">
                        <p className="text-center text-muted">&copy; 2017 More Recipes, Andela Nigeria. All rights reserved.</p>
                    </div>
                </footer>
                {/* <!--Page Footer End--> */}
            </div>
            // <!--Entire Site Wrapper End-->

        );
    }
}

export default AllRecipesPage;