import React from 'react';
import PropTypes from 'prop-types';


/**
 * @description displays recipe ingredients
 * @method Ingredients
 * 
 * @param { string } props - contains recipe ingredients text
 * 
 * @returns { jsx } jsx - renders Ingredients component
 */
const Ingredients = (props) => {
  const ingredients = props.ingredients.split('.');
  return (
    <div className="col-md-4 col-lg-4 mb-3">
      <h5 className="page-text font-weight-bold pb-2">Ingredients</h5>
      <ul
        className="list-group list-group-flush text-muted details break-word">
        {ingredients.map((ingredient, index) => (
          (ingredient.trim()) &&
          <li key={index}>
            <i className="fa fa-check-square-o pr-2 maroon"
              aria-hidden="true"></i>{ingredient.trim()}
          </li>
        ))}
      </ul>
    </div>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired
};

export default Ingredients;
