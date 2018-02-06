import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import requestFeedback from '../../utils/requestFeedback';


/**
 * Validates users signup and signin operations
 * @class Validation
 */
export default class UserValidations {
  /**
   * @description Validates all User signup details before allowing access to controller class
   * @memberof UserValidations
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   * @param   {object} next      the node/express middleware next object
   *
   * @returns {object} validation error messages object or contents of request.body object
   */
  static signup(request, response, next) {
    if (typeof request.body.fullName === 'undefined' || typeof request.body.username === 'undefined' || typeof request.body.email === 'undefined' ||
      typeof request.body.password === 'undefined' || typeof request.body.repassword === 'undefined') {
      return requestFeedback.error(response, 422, 'All or some fields are not defined');
    }
    const fullName = request.body.fullName.trim(),
      username = request.body.username.trim(),
      email = request.body.email.trim(),
      password = request.body.password.trim(),
      repassword = request.body.repassword.trim(),
      errors = {};
    if (!validator.isEmpty(fullName)) {
      if (fullName.search(/[^A-Za-z\s]/) !== -1) {
        errors.fullName = 'Full name must contain only alphabets';
      }
    } else { errors.fullName = 'Full name is required'; }

    if (!validator.isEmpty(username)) {
      if (!validator.toInt(username)) {
        if (!validator.isLength(username, { min: 3, max: 25 })) {
          errors.username = 'Username must be atleast 3 to 25 characters';
        }
      } else { errors.username = 'Username must not start with number(s)'; }
    } else { errors.username = 'Username is required'; }

    if (!validator.isEmpty(email)) {
      if (!validator.isEmail(email)) {
        errors.email = 'Email is invalid';
      }
    } else { errors.email = 'Email is required'; }

    if (!validator.isEmpty(password)) {
      if (!validator.isLength(password, { min: 8, max: 30 })) {
        errors.password = 'Password length must be between 8 and 30';
      }
    } else { errors.password = 'Password is required'; }

    if (!validator.isEmpty(repassword)) {
      if (!validator.equals(validator.trim(repassword), validator.trim(password))) {
        errors.repassword = 'Passwords does not matched';
      }
    } else { errors.repassword = 'Password confirmation is required'; }

    const result = { isValid: isEmpty(errors) };

    if (!result.isValid) {
      return response.status(400).json({ errors });
    }
    return next();
  }

  /**
   * @description Validates signin form input fields before allowing access to controller class
   * @memberof UserValidations
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   * @param   {object} next      the node/express middleware next object
   *
   * @returns {object} validation error messages object or contents of request.body object
   */
  static signin(request, response, next) {
    if (typeof request.body.username === 'undefined' || typeof request.body.password === 'undefined') {
      return requestFeedback.error(response, 422, 'Username or(and) password field(s) is(are) not defined');
    }

    const username = request.body.username.trim(),
      password = request.body.password.trim(),
      errors = {};

    if (validator.isEmpty(username)) {
      errors.username = 'Username is required';
    }

    if (validator.isEmpty(password)) {
      errors.password = 'Password is required';
    }

    const result = { isValid: isEmpty(errors) };

    if (!result.isValid) {
      return response.status(400).json({ errors });
    }
    return next();
  }

  /**
   * @description Validates all User profile update details before allowing access to controller class
   * @memberof UserValidations
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   * @param   {object} next      the node/express middleware next object
   *
   * @returns {object} validation error messages object or contents of request.body object
   */
  static updateUserValidations(request, response, next) {
    if (typeof request.body.fullName === 'undefined' || typeof request.body.username === 'undefined' ||
      typeof request.body.email === 'undefined' || typeof request.body.location === 'undefined' ||
      typeof request.body.aboutMe === 'undefined') {
      return requestFeedback.error(response, 422, 'All or some fields are not defined');
    }

    const fullName = request.body.fullName.trim(),
      username = request.body.username.trim(),
      email = request.body.email.trim(),
      location = request.body.location.trim(),
      aboutMe = request.body.aboutMe.trim(),
      errors = {};

    if (!validator.isEmpty(fullName)) {
      if (fullName.search(/[^A-Za-z\s]/) !== -1) {
        errors.fullName = 'Full name must contain only alphabets';
      }
    } else { errors.fullName = 'Full name is required'; }

    if (!validator.isEmpty(username)) {
      if (!validator.toInt(username)) {
        if (!validator.isLength(username, { min: 3, max: 25 })) {
          errors.username = 'Username must be atleast 3 to 25 characters';
        }
      } else { errors.username = 'Username must not start with number(s)'; }
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
    } else { errors.location = ''; }

    if (aboutMe) {
      if (!validator.isLength(aboutMe, { min: 4, max: undefined })) {
        errors.aboutMe = 'Provided description must be atleast 4 characters';
      }
    } else { errors.aboutMe = ''; }

    const result = { isValid: isEmpty(errors) };

    if (!result.isValid) {
      return response.status(400).json({ errors });
    }
    return next();
  }
}
