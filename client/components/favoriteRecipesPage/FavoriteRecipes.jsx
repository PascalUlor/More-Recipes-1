import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipesList from './FavoriteRecipesList.jsx';

class FavoriteRecipes extends Component {
  render() {
    const { favorites } = this.props;
    if (favorites.length === 0) {
      return (
        <div className="display-4 text-center text-danger mt-3 mb-5">You have no favorited recipes</div>
      );
    }
    return (
      <div className="card-deck mb-4 mt-4">
        <FavoriteRecipesList favorites={favorites}/>
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  favorites: PropTypes.array.isRequired
};

export default FavoriteRecipes;
