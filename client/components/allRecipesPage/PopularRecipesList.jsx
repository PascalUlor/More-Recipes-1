import React from 'react';
import PropTypes from 'prop-types';
import PopularRecipe from './popularRecipesList/PopularRecipe.jsx';


/**
 * @description renders a list of popular recipes
 * @method PopularRecipesList
 * 
 * @param { array } popularRecipes - array of popular recipes
 * 
 * @returns { jsx } jsx - renders PopularRecipesList component
 */
const PopularRecipesList = ({ popularRecipes }) => {
  if (popularRecipes.length > 0) {
    /**
     * @description displays a list of available popular recipes
     *
     * @returns { jsx } jsx - renders popular recipes component
     */
    return (
      <div className="card mb-5">
        <div className="card-body">
          <ul className="list-group list-group-flush mb-2">
            {popularRecipes
              .map((popularRecipe, index) => (index <= 3) &&
                <PopularRecipe
                  key={popularRecipe.id}
                  popularRecipe={popularRecipe} />)
            }
          </ul>
      </div>
    </div>
    );
  }
  return (
    <div></div>
  );
};

PopularRecipesList.propTypes = {
  popularRecipes: PropTypes.array.isRequired
};

export default PopularRecipesList;
