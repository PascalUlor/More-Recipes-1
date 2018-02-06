import React from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipe from './FavoriteRecipe.jsx';


/**
 * @description displays a of list favorite recipe or message of no recipes
 * @method FavoriteRecipesList
 * 
 * @param { object } favorites - object of a single favorite recipe
 * @param { function } setCurrentRecipe - sets currently selected recipe
 * 
 * @returns { jsx } jsx - renders FavoriteRecipeList component
 */
const FavoriteRecipesList = ({ favorites, setCurrentRecipe }) => {
  if (favorites.length === 0) {
    /**
     * @description displays no favorite recipes message
     * 
     * @returns { jsx } jsx - renders no favorite recipes message
     */
    return (
      <div className="not-found lead p-3 mt-3 mt-5">
        <i className=
        "fa fa-exclamation-triangle fa-3x pb-3 text-warning d-block"></i>
        You have no favorite recipes
      </div>
    );
  }

  const favoriteRecipes = favorites
    .map((favorite, index) => (index <= 5) &&
      <FavoriteRecipe
        key={favorite.id}
        favorite={favorite}
        setCurrentRecipe={setCurrentRecipe}/>);

  /**
   * @description displays a list favorite recipe
   * 
   * @returns { jsx } jsx - renders list of favorite recipes component
   */
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
