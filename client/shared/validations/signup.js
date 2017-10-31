import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const signup = (data) => {
    const errors = {};

    if (!validator.isEmpty(data.fullName)) {
        for (let character = 0; character < data.fullName.length; character += 1) {
            if (validator.toInt(data.fullName[character])) {
                errors.fullName = 'Full name must not contain numbers';
                break;
            }
        }
    } else { errors.fullName = 'Full name is required'; }

    if (!validator.isEmpty(data.username)) {
        if (validator.toInt(data.username)) {
            errors.username = 'Username must not start with number(s)';
        }
    } else { errors.username = 'Username is required'; }

    if (!validator.isEmpty(data.email)) {
        if (!validator.isEmail(data.email)) {
            errors.email = 'Email is invalid';
        }
    } else { errors.email = 'Email is required'; }

    if (!validator.isEmpty(data.password)) {
        if (!validator.isLength(data.password, { min: 8, max: 30 })) {
            errors.password = 'Password length must be between 8 and 30';
        }
    } else { errors.password = 'Password is required'; }

    if (!validator.isEmpty(data.repassword)) {
        if (!validator.equals(validator.trim(data.repassword), validator.trim(data.password))) {
            errors.repassword = 'Password mismatched';
        }
    } else { errors.repassword = 'Password confirmation is required'; }

    return { errors, isValid: isEmpty(errors) };
};

export default signup;