import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const updateProfileValidations = (data) => {
  const fullName = data.fullName.trim(),
    username = data.username.trim(),
    email = data.email.trim(),
    location = data.location.trim(),
    aboutMe = data.aboutMe.trim(),
    errors = {};

  if (!validator.isEmpty(fullName)) {
    if (fullName.search(/[^A-Za-z\s]/) !== -1) {
      errors.fullName = 'Full name must contain only alphabets';
    }
  } else { errors.fullName = 'Full name is required'; }

  if (!validator.isEmpty(username)) {
    if (validator.toInt(username)) {
      errors.username = 'Username must not start with number(s)';
    }
  } else { errors.username = 'Username is required'; }

  if (!validator.isEmpty(email)) {
    if (!validator.isEmail(email)) {
      errors.email = 'Email is invalid';
    }
  } else { errors.email = 'Email is required'; }

  if (location) {
    if (location.search(/[^A-Za-z\s]/) !== -1) {
      errors.location = 'Provided location must contain only alphabets';
    }
  }

  if (aboutMe) {
    if (!validator.isLength(aboutMe, { min: 4, max: undefined })) {
      errors.aboutMe = 'Provided description must be atleast 4 characters';
    }
  }

  return { errors, isValid: isEmpty(errors) };
};

export default updateProfileValidations;
