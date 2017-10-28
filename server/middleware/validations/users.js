import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validates users signup and signin operations
 * @class Validation
 */
export default class Validation {
    /**
     * Validates all User signup details before allowing access to controller class
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.body
     */
    static signup(req, res, next) {
        const {
            fullName,
            username,
            email,
            password,
            repassword
        } = req.body,
            errors = {};
        if (fullName === undefined || username === undefined || email === undefined || password === undefined || repassword === undefined) {
            res.status(400)
                .json({
                    status: 'Failed',
                    message: 'All or some fields are not defined'
                });
        }

        if (!(validator.isEmpty(fullName))) {
            for (let character = 0; character < fullName.length; character += 1) {
                if (validator.toInt(fullName[character])) {
                    errors.fullName = 'Full name must not contain numbers';
                    break;
                }
            }
        } else { errors.fullName = 'Full name is required'; }

        if (!(validator.isEmpty(username))) {
            if (validator.toInt(username)) {
                errors.username = 'Username must not start with number(s)';
            }
        } else { errors.username = 'Username is required'; }

        if (!(validator.isEmpty(email))) {
            if (!(validator.isEmail(email))) {
                errors.email = 'Email is invalid';
            }
        } else { errors.email = 'Email is required'; }

        if (!(validator.isEmpty(password))) {
            if (!validator.isLength(password, { min: 8, max: 30 })) {
                errors.password = 'Password length must be between 8 and 30';
            }
        } else { errors.password = 'Password is required'; }

        if (!(validator.isEmpty(repassword))) {
            if (!(validator.equals(validator.trim(repassword), validator.trim(password)))) {
                errors.repassword = 'Password mismatched';
            }
        } else { errors.repassword = 'Password confirmation is required'; }

        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            res.status(400)
                .json({ errors });
        } else {
            next();
        }
    }

    /**
     * Validates signin form input fields before allowing access to controller class
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.body
     */
    static signin(req, res, next) {
        const { username, password } = req.body,
            errors = {};
        if (username === undefined || password === undefined) {
            res.status(400)
                .json({
                    status: 'Failed',
                    message: 'Username or(and) password field(s) is(are) not defined'
                });
        }

        if (validator.isEmpty(username)) {
            errors.username = 'Username is required';
        }

        if (validator.isEmpty(password)) {
            errors.password = 'Password is required';
        }

        const result = { isValid: isEmpty(errors) };

        if (!result.isValid) {
            res.status(400)
                .json({ errors });
        } else {
            next();
        }
    }
}