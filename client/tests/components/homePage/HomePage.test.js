/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import store from '../../../store';
import HomePage from '../../../components/HomePage.jsx';


/**
 * @prop
 *
 * @return { object } history - properties of HomePage component instance
 */
const props = {
  history: {
    push: () => {},
  },
};
const mountWrapper = mount((
  <Provider store={store}>
    <Router><HomePage {...props} /></Router>
  </Provider>
));

describe('HomePage component', () => {
  it('should render correctly', (done) => {
    expect(toJson(mountWrapper)).toMatchSnapshot();
    done();
  });
});
