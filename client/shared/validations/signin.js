import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const signin = (data) => {
    const errors = {};

    if (validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return { errors, isValid: isEmpty(errors) };
};

export default signin;