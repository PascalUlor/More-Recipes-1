import React from 'react';
import PropTypes from 'prop-types';
import PopularRecipe from './PopularRecipe.jsx';


/**
 * @description displays a list of popular recipes
 * @method PopularRecipesList
 * 
 * @param { array } fetchedPopularRecipes - array of popular recipes
 * 
 * @returns { jsx } jsx - renders PopularRecipesList component
 */
const PopularRecipesList = ({ fetchedPopularRecipes }) => {
  const popularRecipes = fetchedPopularRecipes.map(popularRecipe =>
    <PopularRecipe key={popularRecipe.id} popularRecipe={popularRecipe} />);
  return (
    <div className="row">
      {popularRecipes}
    </div>
  );
};

PopularRecipesList.propTypes = {
  fetchedPopularRecipes: PropTypes.array.isRequired
};

export default PopularRecipesList;
