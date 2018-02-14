import React from 'react';
import PropTypes from 'prop-types';
import AllRecipe from './allRecipesList/AllRecipe.jsx';


/**
 * @description displays a list of all recipes
 * @method AllRecipesList
 *
 * @param { array } allRecipes - array of all recipes
 *
 * @returns { jsx } jsx - renders AllRecipesList component
 */
const AllRecipesList = ({ allRecipes, errorMessage }) => (
  <div className="card-deck mb-3 mt-3">
    {
      allRecipes.length === 0 ?
        <div className="not-found lead" id="all-recipes">
          <i className=
            "fa fa-exclamation-triangle fa-3x pb-3 text-warning d-block">
          </i>
          {errorMessage}
        </div>
        :
        allRecipes
          .map(allRecipe =>
            <AllRecipe
              key={allRecipe.id}
              allRecipe={allRecipe} />)
    }
  </div>
);

AllRecipesList.propTypes = {
  allRecipes: PropTypes.array.isRequired,
  errorMessage: PropTypes.string
};

export default AllRecipesList;
