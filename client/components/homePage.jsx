import React, { Component } from 'react';
import HomeNavBar from './homePage/homeNavbar.jsx';
import MainCover from './homePage/mainCover.jsx';
import PopularRecipes from './homePage/popularRecipes.jsx';
import Footer from './footer.jsx';

export default class App extends Component {
  render() {
    return (
        <div>
            <div className="site-wrapper">
                <HomeNavBar/>
                <MainCover/>
                <PopularRecipes/>
            </div>
            <Footer id="homeFooter"/>
      </div>
    );
  }
}