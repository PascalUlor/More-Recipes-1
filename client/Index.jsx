import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import 'rc-pagination/assets/index.css';
import store from './store';
import { setAuthorizationToken } from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/actionCreators/signinActions';
import './assets/css/index.css';
import AppRoutes from './routes/AppRoutes.jsx';


if (jwt.decode(localStorage.jwtToken) !== null) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
} else {
  setAuthorizationToken('');
  store.dispatch(setCurrentUser({}));
}

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes/>
  </Provider>,
  document.querySelector('#app')
);
