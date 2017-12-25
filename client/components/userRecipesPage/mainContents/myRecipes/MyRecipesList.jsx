import React from 'react';
import PropTypes from 'prop-types';
import MyRecipe from './MyRecipe.jsx';

const MyRecipesList = ({ myRecipes }) => (
    <div className="card-deck mb-5 mt-3">
        {myRecipes.length === 0 ?
            <div className='display-4 text-center text-danger'>
                There are no available recipes to display
            </div> :
            myRecipes.map(myRecipe => <MyRecipe key={myRecipe.id} myRecipe={myRecipe}/>)
        }
    </div>
);

MyRecipesList.propTypes = {
    myRecipes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
};

export default MyRecipesList;