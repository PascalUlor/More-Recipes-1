import React from 'react';
import { Link } from 'react-router-dom';


/**
 * @description displays a main contains of dashboard
 * @method MainContents
 * 
 * @returns { jsx } jsx - renders dashboard MainContents component
 */
const MainContents = () => (
	<main id="main-wrapper">
		<div className="container">
			<section className="cover">
				<div className="cover-caption">
					<div className="col">
						<h1 className="display-3 p-2">Welcome, Awesome Cook!</h1>
						<p className="lead text-muted" style={{ fontFamily: 'fantasy' }}>
Begin your adventure of creating awesome recipes and sharing them for
the world to see</p>
					</div>
				</div>
			</section>
			<div className="col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1 p-2">
				<div className="card-deck">
					<div className="col-12 col-sm-12 col-md-12 col-lg-4">
						<div className="card mb-2">
							<img className="card-img img-fluid" src="/images/food1.jpg"
								alt="Card image"/>
							<div className="card-img-overlay">
								<h5 className="card-title text-white">
									Create or View your special recipes</h5>
								<Link to="/user/recipes" className="btn btn-success">
									Create/View recipes
								</Link>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-12 col-md-12 col-lg-4">
						<div className="card mb-2">
							<img className="card-img img-fluid" src="/images/food2.jpg"
								alt="Card image"/>
							<div className="card-img-overlay">
								<h5 className="card-title text-white">
									View your favourite recipes
								</h5>
								<Link to="/user/favorites" className="btn btn-info">
									Favourite Recipes
								</Link>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-12 col-md-12 col-lg-4">
						<div className="card mb-2">
							<img className="card-img img-fluid" src="/images/food3.jpg"
								alt="Card image"/>
							<div className="card-img-overlay">
								<h5 className="card-title text-white">
									Get a list of all available recipes
								</h5>
								<Link to="/recipes" className="btn btn-warning">
									All Recipes
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
);

export default MainContents;
