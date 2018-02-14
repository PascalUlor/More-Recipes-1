/* eslint-disable */
import Enzyme, { shallow, render, mount } from 'enzyme';
import $ from 'jquery';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import localStorage from './__mocks__/localStorage';
// import decode from 'jwt-decode';


// This file is written in ES5 since it's not transpiled by Babel.
// This file does the following:
// 1. Sets Node environment variable
// 2. Registers babel for transpiling our code for testing
// 3. Disables Webpack-specific features that Mocha doesn't understand.
// 4. Requires jsdom so we can test via an in-memory DOM in Node
// 5. Sets up global vars that mimic a browser.
// 6. Sets up a mock store for redux reducers and action-creators

process.env.NODE_ENV = 'test';

// React 16 Enzyme adapter
// configure({ adapter: new Adapter() });
Enzyme.configure({ adapter: new Adapter() });
require.extensions['.css'] = () => null;
require.extensions['.png'] = () => null;
require.extensions['.jpg'] = () => null;

// Mock redux store to test action creators
// Configure mock adapter for axios request
// Create mock store with redux-thunk middleware
// const mock = new MockAdapter(axios);
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.expect = expect;
global.sinon = sinon;
global.moxios = moxios;
global.mockStore = mockStore;
global.localStorage = localStorage;
global.$ = $;
global.jQuery = $;
global.navigator = {
  userAgent: 'node.js'
};

var documentRef = document;

// Disable webpack-specific features for tests since
// Jest doesn't know what to do with them.

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
// var jsdom = require('jsdom');

// const { JSDOM } = jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

// const { document } = (new JSDOM(
//   '<!doctype html><html><body></body></html>')).window;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
