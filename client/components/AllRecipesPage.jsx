import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import NavBar from './HomePage/homeNavbar.jsx';
import PageHeader from './allRecipesPage/PageHeader.jsx';
import AllRecipes from './allRecipesPage/allRecipes.jsx';
import PopularRecipes from './allRecipesPage/popularRecipes.jsx';
import Footer from './footer.jsx';
import { fetchPopularRecipesRequest } from '../actions/actionCreators/popularRecipesActions';
import { fetchAllRecipesRequest } from '../actions/actionCreators/getAllRecipesActions';

class AllRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRecipes: [],
      popularRecipes: [],
      numberOfRecipes: 0,
      pageSize: 0,
      currentPage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentWillMount() {
    this.props.fetchAllRecipesRequest(1)
    .then(() => {
      if (this.props.fetchedAllRecipes.length !== 0) {
        const { currentPage, limit, numberOfRecipes } = this.props.paginationDetails;
        this.setState({
          allRecipes: this.props.fetchedAllRecipes,
          currentPage,
          numberOfRecipes,
          pageSize: limit
        });
      }
    });
    this.props.fetchPopularRecipesRequest(() => {
      if (this.props.fetchedPopularRecipes.length !== 0) {
        this.setState({ popularRecipes: this.props.fetchedPopularRecipes });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    const { currentPage, limit, numberOfRecipes } = nextProps.paginationDetails;
    this.setState({
      allRecipes: nextProps.fetchedAllRecipes,
      currentPage,
      numberOfRecipes,
      pageSize: limit
    });
  }

  handlePageChange(page) {
    this.props.fetchAllRecipesRequest(page);
  }
render() {
  const {
    allRecipes, popularRecipes, currentPage, pageSize, numberOfRecipes
  } = this.state;
  return (
    <div>
      <div className="site-wrapper">
        <NavBar/>
        <div className="container">
          <main id="main-wrapper">
            <div className="col">
              <PageHeader/>
              <div className="row">
                <div className="col-sm-7 col-md-9 col-lg-9">
                  <AllRecipes allRecipes={allRecipes}/>
                  <Pagination
                    onChange={this.handlePageChange}
                    current={currentPage}
                    pageSize={pageSize || 0}
                    total={numberOfRecipes}
                    style={{ marginLeft: '0.86rem', marginTop: '-0.6rem', color: 'black' }}
                    showSizeChanger={true}
                  />
                </div>
                <div className="col-sm-5 col-md-3 col-lg-3">
                  <h6 className="card-title text-info mt-2">Popular Recipes</h6>
                  <PopularRecipes popularRecipes={popularRecipes}/>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer id="homeFooter"/>
    </div>
  );
}
}

AllRecipesPage.propTypes = {
    isRecipesFetching: PropTypes.bool.isRequired,
    fetchedPopularRecipes: PropTypes.array.isRequired,
    fetchedAllRecipes: PropTypes.array.isRequired,
    paginationDetails: PropTypes.shape().isRequired,
    fetchPopularRecipesRequest: PropTypes.func.isRequired,
    fetchAllRecipesRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isRecipesFetching: state.popularRecipes.isPopularRecipesFetching,
    fetchedPopularRecipes: state.popularRecipes.fetchedPopularRecipes,
    isAllRecipesFetching: state.allRecipes.isAllRecipesFetching,
    fetchedAllRecipes: state.allRecipes.fetchedAllRecipes,
    paginationDetails: state.allRecipes.paginationDetails
});

export default connect(mapStateToProps, { fetchPopularRecipesRequest, fetchAllRecipesRequest })(AllRecipesPage);
