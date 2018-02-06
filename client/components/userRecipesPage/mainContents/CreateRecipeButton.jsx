import React from 'react';


/**
 * @description displays a button for creating recipe
 * @method CreateRecipeButton
 *
 * @returns { jsx } jsx - renders CreateRecipeButton component
 */
const CreateRecipeButton = () => (
  <div className="text-left">
    <button
      type="button"
      data-toggle="modal"
      data-target="#createRecipeModal"
      className="btn btn-outline-success ml-5 mt-3">
      <i className="fa fa-plus-circle" aria-hidden="true"></i> Create Recipe
    </button>
  </div>
);

export default CreateRecipeButton;
