/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Pagination from 'rc-pagination';
import Spinner from 'react-md-spinner';
import NavBar from './NavBar.jsx';
import PageHeader from './favoriteRecipesPage/PageHeader.jsx';
import FavoriteRecipesList from './favoriteRecipesPage/FavoriteRecipesList.jsx';
import DeleteRecipeModal from './DeleteRecipeModal.jsx';
import Footer from './Footer.jsx';
import fetchFavoriteRecipesRequest from
  '../actions/actionCreators/getFavoriteRecipesActions';
import deleteFavoriteRecipeRequest from
  '../actions/actionCreators/deleteFavoriteRecipeActions';
import setCurrentRecipeRequest from
  '../actions/actionCreators/setCurrentRecipeActions';
import {
  deleteSelectedRecipe,
  fetchCurrentPageRecipes
} from '../utils/deleteSelectedRecipe';


/**
 * @description HOC for favorite recipe page component
 *
 * @class FavoriteRecipesPage
 *
 * @extends Component
 */
export class FavoriteRecipesPage extends Component {
  /**
   * @description creates an instance of FavoriteRecipesPage
   *
   * @constructor
   *
   * @param { props } props - contains favorite recipes component properties
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
      recipeId: null,
      numberOfRecipes: 0,
      pageSize: 0,
      currentPage: 1
    };
    this.handleDeleteFavoriteRecipe = this.handleDeleteFavoriteRecipe.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   * @description handles fetching user's favorite recipes
   *
   * @method componentDidMount
   *
   * @returns { * } null
   */
  componentDidMount() {
    const { fetchFavoriteRecipes } = this.props;
    fetchFavoriteRecipes(1);
  }
  /**
   * @description receives update on lastest updates
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps - object of new incoming property
   *
   * @returns {*} null
   */
  componentWillReceiveProps(nextProps) {
    const { favoriteRecipes, paginationDetails, currentRecipeId } = nextProps,
      { currentPage, limit, numberOfRecipes } = paginationDetails;
    this.setState({
      favoriteRecipes,
      currentPage,
      numberOfRecipes,
      pageSize: limit,
      recipeId: currentRecipeId
    });
  }
  /**
   * @description handles deleting of user's favorite recipes and fetches
   * the remaining
   * @method handleDeleteFavoriteRecipe
   *
   * @returns {*} null
   */
  handleDeleteFavoriteRecipe() {
    const { deleteFavoriteRecipe, fetchFavoriteRecipes } = this.props,
      { currentPage, recipeId } = this.state;
    deleteSelectedRecipe(deleteFavoriteRecipe, recipeId)
      .then(() => {
        const {
          deleteSuccess, deleteError, isFetching, favoriteRecipes
        } = this.props;
        fetchCurrentPageRecipes(
          deleteSuccess, deleteError, fetchFavoriteRecipes,
          isFetching, favoriteRecipes, currentPage, toastr
        );
      });
  }
  /**
   * @description handles page navigation
   * @method handlePageChange
   *
   * @param {number} page - page number to fetch
   *
   * @returns {*} null
   */
  handlePageChange(page) {
    const { fetchFavoriteRecipes } = this.props;
    fetchFavoriteRecipes(page);
  }
  /**
   * @description renders user favorite recipes
   *
   * @returns { jsx } jsx - renders user favorite recipes component
   */
  render() {
    const {
        favoriteRecipes, currentPage, pageSize, numberOfRecipes
      } = this.state,
      { isFetching } = this.props;
    return (
      <div className="bg-faded">
        <div className="site-wrapper">
          <NavBar/>
          <main className="main-wrapper text-center">
            <div className="container">
              <PageHeader/>
              {isFetching ?
                <div style={{ textAlign: 'center' }}>
                  <Spinner size={50} className="mt-5 mb-5"/>
                </div>
                :
                <div>
                  <div className=
                    "col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1">
                    <FavoriteRecipesList
                      favorites={favoriteRecipes}
                      setCurrentRecipe={this.props.setCurrentRecipe}/>
                    <DeleteRecipeModal
                      handleDelete={this.handleDeleteFavoriteRecipe}/>
                  </div>
                  <div className="col-11 offset-1 pl-0">
                    {
                      (numberOfRecipes > 6 &&
                    typeof numberOfRecipes !== 'undefined') &&
                      <Pagination
                        onChange={this.handlePageChange}
                        current={currentPage}
                        pageSize={pageSize || 0}
                        total={numberOfRecipes}
                        className="pagination"
                      />
                    }
                  </div>
                </div>
              }
            </div>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

FavoriteRecipesPage.propTypes = {
  fetchFavoriteRecipes: PropTypes.func.isRequired,
  favoriteRecipes: PropTypes.array.isRequired,
  currentRecipeId: PropTypes.number.isRequired,
  paginationDetails: PropTypes.shape().isRequired,
  setCurrentRecipe: PropTypes.func.isRequired,
  deleteFavoriteRecipe: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  deleteSuccess: PropTypes.string,
  deleteError: PropTypes.string
};
/**
 * @description maps redux state to props
 *
 * @param { object } state - holds user favorite recipes state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  favoriteRecipes: state.favoriteRecipes.fetchedFavoriteRecipes,
  isFetching: state.favoriteRecipes.isFavoriteRecipesFetching,
  deleteSuccess: state.favoriteRecipes.deleteFavoriteSuccessMessage,
  deleteError: state.favoriteRecipes.deleteFavoriteError,
  currentRecipeId: state.setCurrentRecipe.currentSetRecipeId,
  paginationDetails: state.favoriteRecipes.paginationDetails
});
/**
 * @description maps action dispatch to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
const mapDispatchToProps = dispatch => ({
  fetchFavoriteRecipes: page => dispatch(fetchFavoriteRecipesRequest(page)),
  deleteFavoriteRecipe: recipeId =>
    dispatch(deleteFavoriteRecipeRequest(recipeId)),
  setCurrentRecipe: recipeId => dispatch(setCurrentRecipeRequest(recipeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipesPage);
