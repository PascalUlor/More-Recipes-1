import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setAuthorizationToken } from '../../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from '../actionTypes/actionTypes';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function userSigninRequest(userData) {
    return dispatch => axios.post('/api/v1/users/signin', userData).then((res) => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
    });
}