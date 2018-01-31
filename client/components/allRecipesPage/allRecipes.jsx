import React from 'react';
import PropTypes from 'prop-types';
import AllRecipesList from './allRecipes/AllRecipesList.jsx';

const AllRecipes = ({ allRecipes }) => (
  <div>
    <AllRecipesList allRecipes={allRecipes}/>
  </div>
);

AllRecipes.propTypes = {
  allRecipes: PropTypes.array.isRequired
};

export default AllRecipes;