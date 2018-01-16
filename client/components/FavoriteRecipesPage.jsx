import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Pagination from 'rc-pagination';
import NavBar from './HomePage/homeNavbar.jsx';
import Header from './favoriteRecipesPage/Header.jsx';
import FavoriteRecipes from './favoriteRecipesPage/FavoriteRecipes.jsx';
import DeleteFavoriteRecipeModal from './favoriteRecipesPage/DeleteFavoriteRecipeModal.jsx';
import Footer from './footer.jsx';
import fetchFavoriteRecipesRequest from '../actions/actionCreators/getFavoriteRecipesActions';
import deleteFavoriteRecipeRequest from '../actions/actionCreators/deleteFavoriteRecipeActions';
import { handleRecipeDelete, fetchCurrentPageRecipes } from '../utils/handleDeleteRecipe';

class FavoriteRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
      recipeId: null,
      numberOfRecipes: 0,
      pageSize: 0,
      currentPage: 1
    };
    this.handleFavoriteRecipeDelete = this.handleFavoriteRecipeDelete.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchFavoriteRecipesRequest(1);
  }
  componentWillReceiveProps(nextProps) {
    const { favoriteRecipes } = nextProps,
    { currentPage, limit, numberOfRecipes } = nextProps.paginationDetails;
      this.setState({
        favoriteRecipes,
        currentPage,
        numberOfRecipes,
        pageSize: limit
      });
    if (nextProps.currentRecipeId !== 0) {
      this.setState({ recipeId: nextProps.currentRecipeId });
    }
  }
  handleFavoriteRecipeDelete() {
    const deleteFavoriteRequest = this.props.deleteFavoriteRecipeRequest,
      fetchFavoritesRequest = this.props.fetchFavoriteRecipesRequest,
      { currentPage, recipeId } = this.state;
    handleRecipeDelete(deleteFavoriteRequest, recipeId)
    .then(() => {
      const {
        deleteSuccess, deleteError, isFavoritesFetching, favoriteRecipes
      } = this.props;
      fetchCurrentPageRecipes(
        deleteSuccess, deleteError, fetchFavoritesRequest,
        isFavoritesFetching, favoriteRecipes, currentPage, toastr
      );
    });
  }
  handlePageChange(page) {
    this.props.fetchFavoriteRecipesRequest(page);
  }

  render() {
    const {
    favoriteRecipes, currentPage, pageSize, numberOfRecipes
  } = this.state;
    return (
      <div>
        <div className="site-wrapper">
          <NavBar/>
          <main id="main-wrapper">
            <div className="container">
              <Header/>
              <div className="col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1">
                <FavoriteRecipes favorites={favoriteRecipes}/>
                <DeleteFavoriteRecipeModal handleDelete={this.handleFavoriteRecipeDelete}/>
              </div>
              <div className="col-11 offset-1 pl-0">
              { (numberOfRecipes > 6 && typeof numberOfRecipes !== 'undefined') &&
                <Pagination
                  onChange={this.handlePageChange}
                  current={currentPage}
                  pageSize={pageSize || 0}
                  total={numberOfRecipes}
                  style={{ marginLeft: '0.86rem', marginTop: '-0.6rem', color: 'black' }}
                />
              }
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
  favoriteRecipes: PropTypes.array.isRequired,
  currentRecipeId: PropTypes.number.isRequired,
  paginationDetails: PropTypes.shape().isRequired,
  deleteFavoriteRecipeRequest: PropTypes.func.isRequired,
  isFavoritesFetching: PropTypes.bool.isRequired,
  deleteSuccess: PropTypes.string,
  deleteError: PropTypes.string
};

const mapStateToProps = state => ({
 favoriteRecipes: state.favoriteRecipes.fetchedFavoriteRecipes,
 isFavoritesFetching: state.favoriteRecipes.isFavoriteRecipesFetching,
 deleteSuccess: state.favoriteRecipes.deleteFavoriteSuccessMessage,
 deleteError: state.favoriteRecipes.deleteFavoriteError,
 currentRecipeId: state.setCurrentRecipe.currentSetRecipeId,
 paginationDetails: state.favoriteRecipes.paginationDetails
});

export default connect(mapStateToProps, { fetchFavoriteRecipesRequest, deleteFavoriteRecipeRequest })(FavoriteRecipesPage);
