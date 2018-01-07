import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import NavBar from './HomePage/homeNavbar.jsx';
import Header from './favoriteRecipesPage/Header.jsx';
import FavoriteRecipes from './favoriteRecipesPage/FavoriteRecipes.jsx';
import Pagination from './pagination/Index.jsx';
import DeleteFavoriteRecipeModal from './favoriteRecipesPage/DeleteFavoriteRecipeModal.jsx';
import Footer from './footer.jsx';
import fetchFavoriteRecipesRequest from '../actions/actionCreators/getFavoriteRecipesActions';
import deleteFavoriteRecipeRequest from '../actions/actionCreators/deleteFavoriteRecipeActions';

class FavoriteRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      recipeId: null
    };
    this.handleFavoriteRecipeDelete = this.handleFavoriteRecipeDelete.bind(this);
  }
  componentDidMount() {
    this.props.fetchFavoriteRecipesRequest();
  }
  componentWillReceiveProps(nextProps) {
    const { favorites } = nextProps.favoriteRecipes;
    if (nextProps.favoriteRecipes.favorites) {
      this.setState({ favorites });
    }
    if (nextProps.currentRecipeId !== 0) {
      this.setState({ recipeId: nextProps.currentRecipeId });
    }
  }
  handleFavoriteRecipeDelete() {
    this.props.deleteFavoriteRecipeRequest(this.state.recipeId)
    .then(() => {
      if (this.props.deleteSuccess) {
        toastr.clear();
        toastr.success(this.props.deleteSuccess);
      } else {
        toastr.clear();
        toastr.error(this.props.deleteError);
      }
      $('button[id=close]').click();
    });
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
                <DeleteFavoriteRecipeModal handleDelete={this.handleFavoriteRecipeDelete}/>
              </div>
              <div className="col-11 offset-1 pl-0">
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
  favoriteRecipes: PropTypes.shape().isRequired,
  currentRecipeId: PropTypes.number.isRequired,
  deleteFavoriteRecipeRequest: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.string,
  deleteError: PropTypes.string
};

const mapStateToProps = state => ({
 favoriteRecipes: state.favoriteRecipes.fetchedFavoriteRecipes,
 deleteSuccess: state.favoriteRecipes.deleteFavoriteSuccessMessage,
 deleteError: state.favoriteRecipes.deleteFavoriteError,
 currentRecipeId: state.setCurrentRecipe.currentSetRecipeId
});

export default connect(mapStateToProps, { fetchFavoriteRecipesRequest, deleteFavoriteRecipeRequest })(FavoriteRecipesPage);
