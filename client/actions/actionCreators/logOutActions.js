import { setAuthorizationToken } from '../../utils/setAuthorizationToken';
import { setCurrentUser } from './signinActions';
import { addFlashMessage } from './flashmessages';

export function logOutRequest() {
    return (dispatch) => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        dispatch(addFlashMessage({}));
    };
}