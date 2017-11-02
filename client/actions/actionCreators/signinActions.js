import axios from 'axios';

export function userSigninRequest(userData) {
    return dispatch => axios.post('/api/v1/users/signin', userData);
}