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
import fetchPopularRecipesRequest from '../actions/actionCreators/popularRecipesActions';
import { fetchAllRecipesRequest } from '../actions/actionCreators/getAllRecipesActions';

class AllRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRecipes: 0,
      pageSize: 0,
      currentPage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllRecipes(1);
    this.props.fetchPopularRecipes();
  }
  componentWillReceiveProps(nextProps) {
    const { currentPage, limit, numberOfRecipes } = nextProps.paginationDetails;
    this.setState({
      currentPage,
      numberOfRecipes,
      pageSize: limit
    });
  }

  handlePageChange(page) {
    this.props.fetchAllRecipes(page);
  }
render() {
  const {
    currentPage, pageSize, numberOfRecipes
  } = this.state,
  {
    isAllFetching, isPopularFetching,
    fetchedAllRecipes, fetchedPopularRecipes
  } = this.props;
  return (
    <div className="bg-faded">
      <div className="site-wrapper">
        <NavBar/>
        <div className="container">
          <main className="main-wrapper pt-3">
              <PageHeader/>
                {isAllFetching || isPopularFetching ?
                  <div className="text-center">
                    <Spinner size={50} className="mt-5 mb-5"/>
                  </div>
                :
                <div className="row">
                    <div className="col-sm-7 col-md-9 col-lg-9">
                      <AllRecipesList allRecipes={fetchedAllRecipes}/>
                      <Pagination
                        onChange={this.handlePageChange}
                        current={currentPage}
                        pageSize={pageSize || 0}
                        total={numberOfRecipes}
                        className="pagination"
                      />
                    </div>
                    <div className="col-sm-5 col-md-3 col-lg-3">
                      <h6 className="card-title page-text text-center mt-2">Popular Recipes</h6>
                      <PopularRecipesList popularRecipes={fetchedPopularRecipes}/>
                    </div>
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

const mapStateToProps = state => ({
  isPopularFetching: state.popularRecipes.isPopularRecipesFetching,
  isAllFetching: state.allRecipes.isAllRecipesFetching,
  fetchedPopularRecipes: state.popularRecipes.fetchedPopularRecipes,
  fetchedAllRecipes: state.allRecipes.fetchedAllRecipes,
  paginationDetails: state.allRecipes.paginationDetails
});

const mapDispatchToProps = dispatch => ({
  fetchPopularRecipes: () => (dispatch(fetchPopularRecipesRequest())),
  fetchAllRecipes: page => (dispatch(fetchAllRecipesRequest(page)))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipesPage);
