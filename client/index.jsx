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
import UserRecipesPage from './components/userRecipesPage.jsx';
import RecipeDetailsPage from './components/RecipeDetailsPage.jsx';
import Profile from './components/Profile.jsx';
import AllRecipesPage from './components/AllRecipesPage.jsx';
import indexReducer from './reducers/index';
import { setAuthorizationToken } from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/actionCreators/signinActions';
import requireAuthentication from './utils/requireAuthentication.jsx';
import '../template/public/scss/main.scss';


const store = createStore(
	indexReducer,
	compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

if (jwt.decode(localStorage.jwtToken) !== null) {
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
} else {
	setAuthorizationToken('');
	store.dispatch(setCurrentUser({}));
}

ReactDOM.render(
<Provider store={store}>
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/signup" component={SignupPage} />
			<Route exact path="/signin" component={SigninPage} />
			<Route exact path="/recipes" component={AllRecipesPage} />
			<Route exact path="/dashboard" component={requireAuthentication(Dashboard)} />
			<Route exact path="/user/recipes" component={requireAuthentication(UserRecipesPage)} />
			<Route exact path="/recipes/:id/recipe-details" component={RecipeDetailsPage} />
			<Route exact path="/user/profile" component={requireAuthentication(Profile)} />
		</Switch>
	</Router>
</Provider>,
document.querySelector('#app')
);
