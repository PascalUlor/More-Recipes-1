import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import PopularRecipe from './PopularRecipe.jsx';

const PopularRecipesList = (props) => {
  const { fetchedPopularRecipes, isFetching } = props;
  const popularRecipes = fetchedPopularRecipes.map(popularRecipe =>
    <PopularRecipe key={popularRecipe.id} popularRecipe={popularRecipe} />);
  if (isFetching) {
    return (
      <div style={{ textAlign: 'center' }}>
      <Spinner size={50} className="mt-5 mb-5"/>
      </div>
    );
  }
  return (
    fetchedPopularRecipes.length === 0 ?
    (
      <div className="lead text-center text-warning p-3">
       There are no recipes to display
      </div>
    ) :
    (
      <div className="row">{popularRecipes}</div>
    )
  );
};

PopularRecipesList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchedPopularRecipes: PropTypes.array.isRequired
};

export default PopularRecipesList;