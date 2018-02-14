import { setCurrentUser } from '../actionCreators/signinActions';
import { setAuthorizationToken } from '../../utils/setAuthorizationToken';

/**
 * @description handles user logout user request
 *
 * @returns { undefined }
 */
const logOutRequest = () => (
  (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
);

export default logOutRequest;
