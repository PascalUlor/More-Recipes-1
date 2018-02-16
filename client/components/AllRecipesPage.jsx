/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import Spinner from 'react-md-spinner';
import NavBar from './NavBar.jsx';
import PageHeader from './allRecipesPage/PageHeader.jsx';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import AllRecipesList from './allRecipesPage/AllRecipesList.jsx';
import PopularRecipesList from './allRecipesPage/PopularRecipesList.jsx';
import Footer from './Footer.jsx';
import fetchPopularRecipesRequest from '../actions/actionCreators/popularRecipesActions';
import {
  fetchAllRecipesRequest
} from '../actions/actionCreators/getAllRecipesActions';


/**
 * @description HOC for all recipes component
 *
 * @class AllRecipesPage
 *
 * @extends Component
 */
export class AllRecipesPage extends Component {
  /**
   * @description creates an instance of AllRecipesPage
   *
   * @constructor
   *
   * @param { props } props - contains all recipes component properties
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  /**
   *; @description handles fetching all and popular recipes
   *
   * @method componentDidMount
   *
   * @returns { * } null
   */
  componentDidMount() {
    const { search } = this.state;
    this.props.fetchAllRecipes(1, search);
    this.props.fetchPopularRecipes();
  }
  /**
   * @description handles search value onchange event
   * @method handleChange
   *
   * @param { object } event -
   *
   * @returns {*} null
   */
  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }
  /**
   * @description handles search value onchange event
   * @method handleSearch
   *
   * @param { object } event -
   *
   * @returns {*} null
   */
  handleSearch() {
    const { search } = this.state;
    if (search.length >= 3) {
      this.props.fetchAllRecipes(1, search);
    } else if (search.length === 0) {
      this.props.fetchAllRecipes(1, search);
    }
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
    const { search } = this.state;
    this.props.fetchAllRecipes(page, search);
  }
  /**
   * @description renders all and popular recipes
   *
   * @returns { jsx } jsx - renders all and popular recipes components
   */
  render() {
    const {
        currentPage, limit, numberOfRecipes
      } = this.props.paginationDetails,
      {
        isAllFetching, isPopularFetching, errorMessage,
        fetchedAllRecipes, fetchedPopularRecipes
      } = this.props,
      { search } = this.state;

    let displayRecipes;
    if (fetchedAllRecipes.length < 1 && fetchedPopularRecipes < '/') {
      displayRecipes = (
        <div className="not-found lead p-3 mt-3 mt-5">
          <i className=
            "fa fa-exclamation-triangle fa-3x pb-3 text-warning d-block">
          </i>
          {errorMessage}
        </div>);
    } else {
      displayRecipes = (
        <div className="row">
          <div className="col-sm-7 col-md-9 col-lg-9">
            <AllRecipesList
              allRecipes={fetchedAllRecipes}
              errorMessage={errorMessage}/>
            {(numberOfRecipes > 6 && typeof numberOfRecipes !== 'undefined') &&
          <Pagination
            onChange={this.handlePageChange}
            current={currentPage}
            pageSize={limit || 0}
            total={numberOfRecipes}
            className="pagination"
          />}
          </div>
          <div className="col-sm-5 col-md-3 col-lg-3">
            <h6 className="card-title page-text text-center mt-2">Popular Recipes
            </h6>
            <PopularRecipesList popularRecipes={fetchedPopularRecipes}/>
          </div>
        </div>);
    }

    return (
      <div className="bg-faded">
        <div className="site-wrapper">
          <NavBar/>
          <div className="container">
            <main className="main-wrapper pt-3">
              <PageHeader/>
              <form
                className="col-10 offset-1 col-sm-8 col-lg-6 offset-lg-3"
                onKeyUp={this.handleSearch}>
                <TextFieldGroup
                  font="fa fa-search" name='search'
                  value={search} onChange={this.handleChange}
                  placeholder='search by recipe name e.g fried rice'/>
              </form>
              {(isAllFetching || isPopularFetching) ?
                <div className="text-center">
                  <Spinner size={50} className="mt-5 mb-5"/>
                </div>
                :
                <div>
                  {displayRecipes}
                </div>
              }
            </main>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

AllRecipesPage.propTypes = {
  isPopularFetching: PropTypes.bool.isRequired,
  isAllFetching: PropTypes.bool.isRequired,
  fetchedPopularRecipes: PropTypes.array.isRequired,
  fetchedAllRecipes: PropTypes.array.isRequired,
  paginationDetails: PropTypes.shape().isRequired,
  fetchPopularRecipes: PropTypes.func.isRequired,
  fetchAllRecipes: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};
/**
 * @description maps redux state to props
 *
 * @param { object } state - holds all recipes state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  isPopularFetching: state.popularRecipes.isPopularRecipesFetching,
  isAllFetching: state.allRecipes.isAllRecipesFetching,
  fetchedPopularRecipes: state.popularRecipes.fetchedPopularRecipes,
  fetchedAllRecipes: state.allRecipes.fetchedAllRecipes,
  paginationDetails: state.allRecipes.paginationDetails,
  errorMessage: state.allRecipes.allRecipesError
});
/**
 * @description maps action dispatch to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
const mapDispatchToProps = dispatch => ({
  fetchPopularRecipes: () => dispatch(fetchPopularRecipesRequest()),
  fetchAllRecipes: (page, search) => dispatch(fetchAllRecipesRequest(page, search))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipesPage);
