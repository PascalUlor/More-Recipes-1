import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import HomePage from './components/homePage.jsx';
import SignupPage from './components/signupPage.jsx';
import SigninPage from './components/signinPage.jsx';
import '../template/public/scss/main.scss';


ReactDOM.render(
<Router history={browserHistory}>
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route path="/api/v1/user/signup" component={SignupPage} />
		<Route path="/api/v1/user/signin" component={SigninPage} />
	</Switch>
</Router>,
document.querySelector('#app')
);