import React from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipe from './FavoriteRecipe.jsx';


const FavoriteRecipesList = ({ favorites, setCurrentRecipe }) => {
  if (favorites.length === 0) {
    return (
      <div className="lead text-center text-warning p-3 mt-3 mb-5">You have no favorite recipes</div>
    );
  }
  const favoriteRecipes = favorites
    .map((favorite, index) => (index <= 5) &&
      <FavoriteRecipe
        key={favorite.id}
        favorite={favorite}
        setCurrentRecipe={setCurrentRecipe}/>);
  return (
    <div className="card-deck mb-4 mt-4">
      <div className="row w-100">
        { favoriteRecipes }
      </div>
    </div>
  );
};
FavoriteRecipesList.propTypes = {
  favorites: PropTypes.array.isRequired,
  setCurrentRecipe: PropTypes.func.isRequired
};

export default FavoriteRecipesList;
