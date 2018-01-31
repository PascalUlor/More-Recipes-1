import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const createOrEditRecipe = (data) => {
  const title = data.title.trim(),
    ingredients = data.ingredients.trim(),
    procedures = data.procedures.trim(),
    errors = {};

  if (!validator.isEmpty(title)) {
    if (title.search(/[^A-Za-z\s]/) !== -1) {
      errors.title = 'Recipe title must contain only alphabets';
    }
  } else { errors.title = 'Recipe title is required'; }

  if (!validator.isEmpty(ingredients)) {
    if (!validator.isLength(ingredients, { min: 20, max: 1000 })) {
      errors.ingredients = 'Recipe ingredients provided must be atleast 20 to 1000 characters';
    }
  } else { errors.ingredients = 'Recipe ingredients are required'; }

  if (!validator.isEmpty(procedures)) {
    if (!validator.isLength(procedures, { min: 30, max: 1000 })) {
      errors.procedures = 'Recipe procedures provided must be atleast 30 to 1000 characters';
    }
  } else { errors.procedures = 'Recipe procedures are required'; }

  return { errors, isValid: isEmpty(errors) };
};

export default createOrEditRecipe;
