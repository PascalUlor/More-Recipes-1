import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipesList from './FavoriteRecipesList.jsx';

class FavoriteRecipes extends Component {
  render() {
    const { favorites } = this.props,
    display = favorites.length === 0 ?
      <div className="display-4 text-center text-danger mt-3 mb-5">You have no favorite recipes</div> :
      <div className="card-deck mb-4 mt-4">
        <FavoriteRecipesList favorites={favorites}/>
      </div>;
    return (
      <div>
        { display }
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  favorites: PropTypes.array.isRequired
};

export default FavoriteRecipes;
