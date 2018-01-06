import React, { Component } from 'react';

class FavoriteRecipesPage extends Component {
  render() {
    return (
      <div className="site-wrapper">
        <div className="container">
          <header>
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
                    <a className="nav-link" href="./recipes_list.html">All Recipes</a>
                  </li>
                </ul>
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="beautify">Chyke</span>
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
          </header>
        </div>
        <main id="main-wrapper">
          <div className="container">
            <section className="cover text-center">
              <div className="col">
                <h3 className="text-info p-2">My Favorites</h3>
              </div>
              <hr id="favorites"/>
            </section>
            <div className="col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1">
              <div className="card-deck mb-5 mt-4">
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 pt-2">
                  <div className="card">
                    <img className="card-img-top" src="/images/food1.jpg" alt="Card image cap"/>
                    <div className="card-body p-2">
                      <h5 className="card-title text-muted mt-2">Indian Tomato Sauce</h5>
                      <p className="text-muted w-100 text-center">
                        <i className="fa fa-user text-info" aria-hidden="true"></i> Johnny Bravo
                      </p>
                      <div>
                        <a href="./recipe_details.html" className="btn btn-sm btn-outline-info mr-2"><i className="fa fa-eye" aria-hidden="true"></i> View</a>
                        <button type="button" className="btn btn-sm btn-outline-danger ml-2"><i className="fa fa-trash"></i> Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 pt-2">
                  <div className="card">
                    <img className="card-img-top" src="/images/food2.jpg" alt="Card image cap"/>
                    <div className="card-body p-2">
                      <h5 className="card-title text-muted mt-2">American Crunchy Burger</h5>
                      <p className="text-muted w-100 text-center">
                        <i className="fa fa-user text-info" aria-hidden="true"></i> Paul Pogba
                      </p>
                      <div>
                        <a href="./recipe_details.html" className="btn btn-sm btn-outline-info mr-2"><i className="fa fa-eye" aria-hidden="true"></i> View</a>
                        <button type="button" className="btn btn-sm btn-outline-danger ml-2"><i className="fa fa-trash"></i> Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 pt-2">
                  <div className="card">
                    <img className="card-img-top" src="/images/food3.jpg" alt="Card image cap"/>
                    <div className="card-body p-2">
                      <h5 className="card-title text-muted mt-2">French Spicy Fries</h5>
                      <p className="text-muted w-100 text-center">
                        <i className="fa fa-user text-info" aria-hidden="true"></i> Abraham Fish
                      </p>
                      <div>
                        <a href="./recipe_details.html" className="btn btn-sm btn-outline-info mr-2"><i className="fa fa-eye" aria-hidden="true"></i> View</a>
                        <button type="button" className="btn btn-sm btn-outline-danger ml-2"><i className="fa fa-trash"></i> Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6 col-sm-4 col-md-4 col-lg-4 offset-3 offet-sm-4 offset-md-4 offset-lg-4">
                <ul className="pagination text-center">
                  <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
              </div>
            </div>

            <footer id="copywrite" className="mt-5">
              <hr/>
              <div className="row">
                <div className="col-12 col-sm-8 col-md-8 col-lg-6">
                  <small id="copywrite" className="text-muted">&copy;2017 Bootcamp27, Andela Nigeria. All rights reserved.</small>
                </div>
                <div className="col-12 col-sm-4 col-md-4 col-lg-6">
                  <ul className="list-inline">
                    <li className="list-inline-item"><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                    <li className="list-inline-item"><a href="#"><i className="fa fa-github"></i></a></li>
                    <li className="list-inline-item"><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li className="list-inline-item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    );
  }
}

export default FavoriteRecipesPage;
