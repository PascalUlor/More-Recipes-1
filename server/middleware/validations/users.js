import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validates users signup and signin operations
 * @class Validation
 */
export default class UserValidations {
    /**
     * Validates all User signup details before allowing access to controller class
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
        if (request.body.fullName === undefined || request.body.username === undefined || request.body.email === undefined ||
            request.body.password === undefined || request.body.repassword === undefined) {
            return response.status(400).json({
                status: 'Failed',
                message: 'All or some fields are not defined'
            });
        }
        const fullName = request.body.fullName.trim(),
            username = request.body.username.trim(),
            email = request.body.email.trim(),
            password = request.body.password.trim(),
            repassword = request.body.repassword.trim(),
            errors = {};
        if (!validator.isEmpty(fullName)) {
            const containNumber = fullName.split('').filter(character => validator.toInt(character));
            if (containNumber.length !== 0) {
                errors.fullName = 'Full name must not contain numbers';
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

        if (!validator.isEmpty(password)) {
            if (!validator.isLength(password, { min: 8, max: 30 })) {
                errors.password = 'Password length must be between 8 and 30';
            }
        } else { errors.password = 'Password is required'; }

        if (!validator.isEmpty(repassword)) {
            if (!validator.equals(validator.trim(repassword), validator.trim(password))) {
                errors.repassword = 'Password mismatched';
            }
        } else { errors.repassword = 'Password confirmation is required'; }

        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            return response.status(400).json({ errors });
        }
        next();
    }

    /**
     * Validates signin form input fields before allowing access to controller class
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
        if (request.body.username === undefined || request.body.password === undefined) {
            return response.status(400).json({
                status: 'Failed',
                message: 'Username or(and) password field(s) is(are) not defined'
            });
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
        next();
    }
}