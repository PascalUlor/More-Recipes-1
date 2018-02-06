import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import indexReducer from './reducers/index';


const env = process.env.NODE_ENV || development;

let middleware = compose(applyMiddleware(thunk,
    reduxImmutableStateInvariant()), window.devToolsExtension ?
  window.devToolsExtension() : f => f);

if (env === 'production') {
  middleware = applyMiddleware(thunk);
}

const store = createStore(
  indexReducer,
  middleware
);

export default store;
