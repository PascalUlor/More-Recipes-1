import { combineReducers } from 'redux';
import flashMessages from './flashmessages';
import authUser from './authUser';

export default combineReducers({
    flashMessages,
    authUser
});