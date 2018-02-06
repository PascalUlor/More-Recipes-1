import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import {
	BrowserRouter as Router, Route, browserHistory, Switch
} from 'react-router-dom';
import 'rc-pagination/assets/index.css';
import store from './store';
import HomePage from './components/HomePage.jsx';
import SignupPage from './components/SignupPage.jsx';
import SigninPage from './components/SigninPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import UserRecipesPage from './components/UserRecipesPage.jsx';
import FavoriteRecipesPage from './components/FavoriteRecipesPage.jsx';
import RecipeDetailsPage from './components/RecipeDetailsPage.jsx';
import Profile from './components/Profile.jsx';
import AllRecipesPage from './components/AllRecipesPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import { setAuthorizationToken } from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/actionCreators/signinActions';
import RequireAuthentication from './utils/RequireAuthentication.jsx';
import './assets/css/index.css';


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
			<Route exact path="/dashboard"
				component={RequireAuthentication(Dashboard)} />
			<Route exact path="/user/recipes"
				component={RequireAuthentication(UserRecipesPage)} />
			<Route exact path="/user/favorites"
				component={RequireAuthentication(FavoriteRecipesPage)} />
			<Route exact path="/recipes/:id/recipe-details"
				component={RecipeDetailsPage} />
			<Route exact path="/user/profile"
				component={RequireAuthentication(Profile)} />
			<Route component={NotFoundPage} />
		</Switch>
	</Router>
</Provider>,
document.querySelector('#app')
);
