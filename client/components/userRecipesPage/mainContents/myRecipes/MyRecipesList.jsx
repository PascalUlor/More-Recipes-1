import React from 'react';
import PropTypes from 'prop-types';
import MyRecipe from './MyRecipe.jsx';


const MyRecipesList = ({ myRecipes, setCurrentRecipe }) => {
  if (myRecipes.length === 0) {
    return (
      <div
        className="lead text-center text-warning p-3 mt-3 mb-5">
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