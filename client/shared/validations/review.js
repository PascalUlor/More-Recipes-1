import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


const postReviewValidations = (review) => {
  const reviewBody = review.trim(),
    errors = {};

  if (!validator.isEmpty(reviewBody)) {
    if (!validator.isLength(reviewBody, { min: 4, max: undefined })) {
      errors.reviewBody = 'Review provided must be atleast 4 characters';
    }
  } else { errors.reviewBody = 'Review for recipe is required'; }

  return { errors, isValid: isEmpty(errors) };
};

export default postReviewValidations;
