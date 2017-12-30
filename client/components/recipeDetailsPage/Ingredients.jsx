import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ingredients extends Component {
  render() {
    const ingredients = this.props.ingredients.split('.');
    return (
      <div className="col-md-4 col-lg-4 mb-3">
        <h5 className="text-success pb-2">Ingredients</h5>
        <ul className="list-group list-group-flush text-muted details">
          {ingredients.map((ingredient, index) => (
            (ingredient.trim()) &&
            <li key={index}>
              <i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>{ingredient.trim()}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired
};

export default Ingredients;
