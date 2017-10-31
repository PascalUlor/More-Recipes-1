import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import HomePage from './components/homePage.jsx';
import SignupPage from './components/signupPage.jsx';
import SigninPage from './components/signinPage.jsx';
import '../template/public/scss/main.scss';

const store = createStore(
	(state = {}) => state,
	applyMiddleware(thunk)
);


ReactDOM.render(
<Provider store={store}>
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route path="/api/v1/user/signup" component={SignupPage} />
			<Route path="/api/v1/user/signin" component={SigninPage} />
		</Switch>
	</Router>
</Provider>,
document.querySelector('#app')
);