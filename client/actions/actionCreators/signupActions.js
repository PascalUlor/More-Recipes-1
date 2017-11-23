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

export function userSignupRequest(userData) {
    return dispatch => axios.post('/api/v1/users/signup', userData).then((response) => {
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
    });
}