/* eslint-disable */
import React, { Component } from 'react';
import store from '../store';
import NavBar from './NavBar.jsx';
import FlashMessage from './FlashMessage.jsx';
import MainContents from './dashboard/MainContents.jsx';
import Footer from './Footer.jsx';
import addFlashMessage from '../actions/actionCreators/flashMessage';


/**
 * @description HOC for all Dashboard component
 *
 * @class Dashboard
 *
 * @extends Component
 */
class Dashboard extends Component {
  /**
   * @description handles clearing of flash message after 4secs
   *
   * @method componentDidMount
   *
   * @returns { * } null
   */
  componentDidMount() {
    if (localStorage.jwtToken) {
      setTimeout(() => {
        store.dispatch(addFlashMessage({}));
      }, 4000);
    }
  }
  /**
   * @description renders dashboard components
   *
   * @returns { jsx } jsx - renders dashboard components
   */
  render() {
    return (
      <div className="bg-faded">
        <div>
          <NavBar/>
          <div className="main-wrapper text-center">
            <FlashMessage/>
            <MainContents/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Dashboard;
