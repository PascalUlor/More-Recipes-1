import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import MyRecipesList from './myRecipes/MyRecipesList.jsx';
import fetchUserRecipesRequest from '../../../actions/actionCreators/getUserRecipesActions';


class MyRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRecipes: [],
      numberOfRecipes: 0,
      pageSize: 0,
      currentPage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserRecipesRequest(1)
    .then(() => {
      if (this.props.fetchedUserRecipes.length !== 0) {
        const { currentPage, limit, numberOfRecipes } = this.props.paginationDetails;
        this.setState({
          myRecipes: this.props.fetchedUserRecipes,
          currentPage,
          numberOfRecipes,
          pageSize: limit
        });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    const { currentPage, limit, numberOfRecipes } = nextProps.paginationDetails;
    this.setState({
      myRecipes: nextProps.fetchedUserRecipes,
      currentPage,
      numberOfRecipes,
      pageSize: limit
    });
    if (nextProps.fetchedUserRecipes.length !== this.state.myRecipes.length) {
      this.setState({ myRecipes: nextProps.fetchedUserRecipes });
    }
  }
handlePageChange(page) {
  this.props.fetchUserRecipesRequest(page);
}

render() {
  const {
    myRecipes, currentPage, pageSize, numberOfRecipes
  } = this.state;
  return (
    <div className="col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1">
      <MyRecipesList myRecipes={myRecipes}/>
      {(numberOfRecipes > 6 && typeof numberOfRecipes !== 'undefined') &&
      <Pagination
        onChange={this.handlePageChange}
        current={currentPage}
        pageSize={pageSize || 0}
        total={numberOfRecipes}
        style={{ marginLeft: '0.86rem', marginTop: '-0.6rem', color: 'black' }}
      />}
    </div>
  );
}
}

MyRecipes.propTypes = {
  isRecipeFetching: PropTypes.bool.isRequired,
  fetchedUserRecipes: PropTypes.array.isRequired,
  fetchUserRecipesRequest: PropTypes.func.isRequired,
  paginationDetails: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  isRecipeFetching: state.userRecipes.isUserRecipesFetching,
  fetchedUserRecipes: state.userRecipes.fetchedUserRecipes,
  paginationDetails: state.userRecipes.paginationDetails
});

export default connect(mapStateToProps, { fetchUserRecipesRequest })(MyRecipes);