import React from 'react';
import PropTypes from 'prop-types';
import PopularRecipe from './popularRecipe.jsx';

const PopularRecipesList = ({ popularRecipes }) => (
    <div>
        {popularRecipes.length === 0 ?
            <div className='display-4 text-center text-danger'>
                There are no available recipes to display
            </div> :
            <ul className="list-group list-group-flush mb-2">
                {popularRecipes.map((popularRecipe, i) =>
                    (i <= 3) && <PopularRecipe key={popularRecipe.id} popularRecipe={popularRecipe} />)
                }
            </ul>
        }
    </div>
);

PopularRecipesList.propTypes = {
    popularRecipes: PropTypes.array.isRequired
};

export default PopularRecipesList;