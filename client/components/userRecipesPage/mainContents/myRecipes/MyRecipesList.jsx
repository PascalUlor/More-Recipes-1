import React from 'react';
import PropTypes from 'prop-types';
import MyRecipe from './MyRecipe.jsx';


/**
 * @description renders a list of all user's recipes
 * @method MyRecipesList
 * 
 * @param { array } myRecipes - array of all user's recipes
 * 
 * @returns { jsx } jsx - renders MyRecipesList component
 */
const MyRecipesList = ({ myRecipes, setCurrentRecipe }) => {
  if (myRecipes.length === 0) {
    return (
      <div className="not-found lead p-3 mt-3 mt-5">
        <i className=
        "fa fa-exclamation-triangle fa-3x pb-3 text-warning d-block">
        </i>
        You have no available recipes
      </div>
    );
  }
  const userRecipes = myRecipes
    .sort((a, b) => b.id - a.id)
    .map((myRecipe, index) => (index <= 5) &&
        <MyRecipe
          key={myRecipe.id}
          myRecipe={myRecipe}
          setCurrentRecipe={setCurrentRecipe}/>);
  return (
    <div className="card-deck mb-4 mt-4">
      { userRecipes }
    </div>
  );
};

MyRecipesList.propTypes = {
  myRecipes: PropTypes.array.isRequired,
  setCurrentRecipe: PropTypes.func.isRequired
};

export default MyRecipesList;
