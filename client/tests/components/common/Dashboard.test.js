/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import Dashboard from '../../../components/Dashboard.jsx';

describe('<Dashboard/>', () => {
  it('renders dashboard component without crashing', () => {
    const props = {
    };
    const store = mockStore({
      authenticatedUser: {
        isAuthenticated: false,
        user: {},
      },
      flashMessage: {
        message: {
          type: '',
          text: '',
        }
      }
    });
    const shallowWrapper = mount((
      <Provider store={store}>
        <Router>
          <Dashboard {...props} />
        </Router>
      </Provider>));
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
