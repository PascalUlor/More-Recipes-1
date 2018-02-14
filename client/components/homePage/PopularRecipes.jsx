import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PopularRecipesList from './popularRecipes/PopularRecipesList.jsx';


/**
 * @description displays popular recipes or message of no recipes
 * @method PopularRecipes
 *
 * @param { array } fetchedPopularRecipes - array of popular recipes
 *
 * @returns { jsx } jsx - renders PopularRecipes component
 */
const PopularRecipes = ({ fetchedPopularRecipes }) => {
  let message = 'Want to view more awesome recipes?';
  if (fetchedPopularRecipes.length <= 6) {
    message = 'Want to create your awesome recipe?';
  }
  return (
    <section id="home">
      <div className="container">
        <section className="cover text-center mb-3 mt-4">
          <h3 className="page-header">Popular Recipes</h3>
          <hr id="favorites"/>
        </section>
        {fetchedPopularRecipes.length < 1 ?
          <div className="lead text-center text-warning p-3">
            There are no recipes to display
          </div>
          :
          <PopularRecipesList
            fetchedPopularRecipes={fetchedPopularRecipes}
          />
        }
        <div className="row">
          <div className="col text-center">
            <p className="lead font-weight-bold mb-5 mt-3">
              {message}
              <Link to="/signup"> Sign Up Now</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

PopularRecipes.propTypes = {
  fetchedPopularRecipes: PropTypes.array.isRequired
};

export default PopularRecipes;
