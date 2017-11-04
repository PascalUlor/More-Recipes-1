import { setAuthorizationToken } from '../../utils/setAuthorizationToken';
import { setCurrentUser } from './signinActions';

export function logOutRequest() {
    return (dispatch) => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}