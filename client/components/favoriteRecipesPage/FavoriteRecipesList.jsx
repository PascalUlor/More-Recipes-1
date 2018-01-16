import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipe from './FavoriteRecipe.jsx';


class FavoriteRecipesList extends Component {
  render() {
    const display = this.props.favorites
      .map((favorite, index) => (index <= 5) &&
        <FavoriteRecipe favorite={favorite} key={favorite.id}/>);
    return (
      <div className="row">
        { display }
      </div>
    );
  }
}

FavoriteRecipesList.propTypes = {
  favorites: PropTypes.array.isRequired
};

export default FavoriteRecipesList;
