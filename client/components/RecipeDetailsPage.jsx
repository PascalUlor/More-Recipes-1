import React, { Component } from 'react';

class RecipeDetailsPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="site-wrapper">
          <header>
            <nav className="navbar navbar-toggleable-md navbar-light">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarItems" aria-controlsName="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
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
                    <a className="nav-link" href="./favourites.html">Favorites</a>
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
          <main className="pl-4 pr-3 mt-4">
            <div className="row mb-4">
              <div className="col-md-8 col-lg-8 mb-3">
                <div className="card">
                  <img className="img-fluid" id="recipe_image" src="/images/food3.jpg " alt="Card image cap" />
                  <div className="card-body">
                    <div className=" pt-2 pb-2">
                      <div className="row">
                        <div className="col-10 offset-1">
                          <div className="row">
                            <div className="col-3 p-1">
                              <span className="text-success"><i className="fa fa-thumbs-o-up fa-2x action" id="upvote" aria-hidden="true"></i> 42</span>
                            </div>
                            <div className="col-3 p-1">
                              <span className="text-danger"><i className="fa fa-thumbs-o-down fa-2x action" id="downvote" aria-hidden="true"></i> 15</span>
                            </div>
                            <div className="col-6 p-1 text-right text-warning"><i className="fa fa-heart-o fa-2x action" id="favorite"></i></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-mute text-center font-italic pt-1">
                        <span className="lead text-muted">Last Updated: 07.04.17</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 mb-3">
                <h2 className="text-success font-weight-bold">French Spicy Fries</h2>
                <p className="lead font-italic p-2 text-muted" id="description">The best african continental dish. Very easy to prepare and less time consuming. Enjoy!</p>
                <div>
                  <p className="lead mb-0 font-weight-bold text-success">Time To Prepare</p>
                  <span className="maroon"><i className="fa fa-clock-o pl-1"></i><small className="text-muted font-italic" id="time"> 20 mins</small></span>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4 col-lg-4 mb-3">
                <h5 className="text-success pb-2">Ingredients</h5>
                <ul className="list-group list-group-flush text-muted details">
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>1 tea spoon of sugar and vinegar</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>red grinded fresh pepper</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true "></i>1 galoon of groundnut oil</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>2kg vegetable leaves</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>4 cubes of maggie</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true "></i>2 table spoons of salt</li>
                </ul>
              </div>
              <div className="col-1"></div>
              <div className="col-md-7 col-lg-7">
                <h5 className="text-success pb-2">Procedures</h5>
                <ul className="list-group list-group-flush text-muted details">
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>Boil water for about 5 minutes, then bring down</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>Wash meat properly with salt to get rid of germs and sand</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>gsghhdbhd sjdbjb hsbdhbs hs shs hjshdbhbjs</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>gsghhdbhd sjdbjb hsbdhbs hs shs hjshdbhbjs</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>gsghhdbhd sjdbjb hsbdhbs hs shs hjshdbhbjs</li>
                  <li><i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>gsghhdbhd sjdbjb hsbdhbs hs shs hjshdbhbjs</li>
                </ul>
              </div>
            </div>
            <h5 className="mt-3 text-success">Post Your Review</h5>
            <div className="col p-0 mb-2">
              <textarea rows="7" className="form-control" placeholder="enter your review for this recipe"></textarea>
            </div>
            <button className="btn btn-outline-success" type="submit">Post Review</button>
            <section>
              <h5 className="text-muted mt-4 mb-3 pt-3">Reviews</h5>
              <div className="card">
                <div className="card-header pl-3 pt-0 m-0">
                  <div className="reviews">
                    <img src="/images/nophoto.jpg" id="profile_image" className="img-fluid figure-img rounded" alt="profile image"/>
                    <div className="d-inline-block mt-5 pl-2">
                      <small className="d-block font-weight-bold">cool_chyke</small>
                      <small className="font-italic text-muted">Posted - 2 hours ago</small>
                    </div>
                    <small className="d-block">I really loved your recipe. Great job.</small>
                  </div>
                  <hr className="mb-0 pb-0" />
                  <div className="reviews">
                    <img src="/images/nophoto.jpg" id="profile_image" className="img-fluid figure-img rounded" alt="profile image"/>
                    <div className="d-inline-block mt-5 pl-2">
                      <small className="d-block font-weight-bold">cool_chyke</small>
                      <small className="font-italic text-muted">Posted - 2 hours ago</small>
                    </div>
                    <small className="d-block">I really loved your recipe. Great jobI really loved your recipe. GreI really loved your recipe. Great jobI really loved your recipe. Great jobat jobI really loved your recipe. Great jobI really loved your recipe. Great job.</small>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        <footer id="copyright">
          <hr/>
          <div className="container">
            <p className="text-center text-muted">&copy; 2017 More Recipes, Andela Nigeria. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default RecipeDetailsPage;
