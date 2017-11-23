import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import HomePage from './components/homePage.jsx';
import SignupPage from './components/signupPage.jsx';
import SigninPage from './components/signinPage.jsx';
import Dashboard from './components/dashboard.jsx';
import indexReducer from './reducers/index';
import { setAuthorizationToken } from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/actionCreators/signinActions';
import '../template/public/scss/main.scss';

const store = createStore(
	indexReducer,
	compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(localStorage.jwtToken));
}

ReactDOM.render(
<Provider store={store}>
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route path="/signup" component={SignupPage} />
			<Route path="/signin" component={SigninPage} />
			<Route path="/dashboard" component={Dashboard} />
		</Switch>
	</Router>
</Provider>,
document.querySelector('#app')
);
