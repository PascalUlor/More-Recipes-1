import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import Spinner from 'react-md-spinner';
import NavBar from './NavBar.jsx';
import PageHeader from './allRecipesPage/PageHeader.jsx';
import AllRecipesList from './allRecipesPage/AllRecipesList.jsx';
import PopularRecipesList from './allRecipesPage/PopularRecipesList.jsx';
import Footer from './Footer.jsx';
import fetchPopularRecipesRequest from
'../actions/actionCreators/popularRecipesActions';
import { fetchAllRecipesRequest } from
'../actions/actionCreators/getAllRecipesActions';


/**
 * @description HOC for all recipes component
 *
 * @class AllRecipesPage
 *
 * @extends Component
 */
class AllRecipesPage extends Component {
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
      numberOfRecipes: 0,
      pageSize: 0,
      currentPage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   * @description handles fetching all and popular recipes
   * 
   * @method componentDidMount
   *
   * @returns { * } null
   */
  componentDidMount() {
    this.props.fetchAllRecipes(1);
    this.props.fetchPopularRecipes();
  }
  /**
   * @description receives update on lastest updates
   * @method componentWillReceiveProps
   * 
   * @param {any} nextProps
   * 
   * @returns {object} -  null
   */
  componentWillReceiveProps(nextProps) {
    const {
      currentPage, limit, numberOfRecipes
    } = nextProps.paginationDetails;
    this.setState({
      currentPage,
      numberOfRecipes,
      pageSize: limit
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
    this.props.fetchAllRecipes(page);
  }
  /**
   * @description renders all and popular recipes
   *
   * @returns { jsx } jsx - renders all and popular recipes components
   */
  render() {
    const {
      currentPage, pageSize, numberOfRecipes
    } = this.state,
    {
      isAllFetching, isPopularFetching,
      fetchedAllRecipes, fetchedPopularRecipes
    } = this.props;

    let display;
    if (fetchedAllRecipes.length < 1) {
      display = (
      <div className="not-found lead p-3 mt-3 mt-5">
        <i className=
        "fa fa-exclamation-triangle fa-3x pb-3 text-warning d-block">
        </i>
          There are no recipes to display
      </div>);
    } else {
      display = (
      <div className="row">
        <div className="col-sm-7 col-md-9 col-lg-9">
          <AllRecipesList allRecipes={fetchedAllRecipes}/>
          {(numberOfRecipes > 6 && typeof numberOfRecipes !== 'undefined') &&
          <Pagination
            onChange={this.handlePageChange}
            current={currentPage}
            pageSize={pageSize || 0}
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
                  {(isAllFetching || isPopularFetching) ?
                    <div className="text-center">
                      <Spinner size={50} className="mt-5 mb-5"/>
                    </div>
                  :
                    <div>
                      {display}
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
  fetchAllRecipes: PropTypes.func.isRequired
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
  paginationDetails: state.allRecipes.paginationDetails
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
  fetchAllRecipes: page => dispatch(fetchAllRecipesRequest(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipesPage);
