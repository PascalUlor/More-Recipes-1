import { combineReducers } from 'redux';
import flashMessages from './flashmessages';
import authUser from './authUser';
import createRecipe from './createRecipe';

export default combineReducers({
  flashMessages,
  authUser,
  createRecipe
});
