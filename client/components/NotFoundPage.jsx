import React, { Component } from 'react';
import Navbar from './NavBar.jsx';
import Footer from './Footer.jsx';


/**
 * @description defines 404 page not found component
 *
 * @class NotFoundPage
 *
 * @extends Component
 */
class NotFoundPage extends Component {
  /**
   * @description renders 404 page
   *
   * @returns { jsx } jsx - renders 404 page not found component
   */
  render() {
    return (
      <div className="bg-faded">
        <Navbar/>
        <main className="main-wrapper">
          <div className="not-found lead">
            <i
              className=
                "fa fa-exclamation-triangle fa-3x pb-3 d-block text-warning">
            </i>
            Ooops!!!.. Page Not Found
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default NotFoundPage;
