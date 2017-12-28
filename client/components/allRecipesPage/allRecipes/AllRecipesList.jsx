import React from 'react';
import PropTypes from 'prop-types';
import AllRecipe from './AllRecipe.jsx';

const AllRecipesList = ({ allRecipes }) => (
    <div className="card-deck mb-3 mt-3">
        {allRecipes.length === 0 ?
            <div className='display-4 text-center text-danger'>
                There are no available recipes to display
            </div> :
            allRecipes.map(allRecipe => <AllRecipe key={allRecipe.id} allRecipe={allRecipe} />)
        }
    </div>
);

AllRecipesList.propTypes = {
    allRecipes: PropTypes.array.isRequired
};

export default AllRecipesList;