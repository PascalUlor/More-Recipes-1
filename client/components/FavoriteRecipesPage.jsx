import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from './HomePage/homeNavbar.jsx';
import Header from './favoriteRecipesPage/Header.jsx';
import FavoriteRecipes from './favoriteRecipesPage/FavoriteRecipes.jsx';
import Pagination from './pagination/Index.jsx';
import Footer from './footer.jsx';
import fetchFavoriteRecipesRequest from '../actions/actionCreators/getFavoriteRecipesActions';

class FavoriteRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }
  componentDidMount() {
    this.props.fetchFavoriteRecipesRequest();
  }
  componentWillReceiveProps(nextProps) {
    const { favorites } = nextProps.favoriteRecipes;
    if (nextProps.favoriteRecipes.favorites) {
      this.setState({ favorites });
    }
  }

  render() {
    return (
      <div>
        <div className="site-wrapper">
          <NavBar/>
          <main id="main-wrapper">
            <div className="container">
              <Header/>
              <div className="col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1">
                <FavoriteRecipes favorites={this.state.favorites}/>
                <Pagination/>
              </div>
            </div>
          </main>
        </div>
        <Footer id="footer"/>
      </div>
    );
  }
}

FavoriteRecipesPage.propTypes = {
  fetchFavoriteRecipesRequest: PropTypes.func.isRequired,
  favoriteRecipes: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
 favoriteRecipes: state.favoriteRecipes.fetchedFavoriteRecipes
});

export default connect(mapStateToProps, { fetchFavoriteRecipesRequest })(FavoriteRecipesPage);
