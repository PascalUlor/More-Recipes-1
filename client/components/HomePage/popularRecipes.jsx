import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchPopularRecipesRequest from '../../actions/actionCreators/popularRecipesActions';
import PopularRecipesList from './popularRecipes/PopularRecipesList.jsx';

class PopularRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true
    };
  }
  componentDidMount() {
    const { fetchPopularRecipes } = this.props;
    fetchPopularRecipes()
    .then(() => {
      this.setState({ isFetching: false });
    });
  }
  render() {
    return (
      <section id="home">
        <div className="container">
          <section className="cover text-center mb-3 mt-4">
            <h3 className="page-header">Popular Recipes</h3>
            <hr id="favorites"/>
          </section>
          <PopularRecipesList
            fetchedPopularRecipes={this.props.fetchedPopularRecipes}
            {...this.state}
          />
          <div className="row">
            <div className="col text-center">
              <p className="lead font-weight-bold mb-5 mt-3">Want to view more awesome recipes?
                <Link to="/signup"> Sign Up Now</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

PopularRecipes.propTypes = {
  fetchedPopularRecipes: PropTypes.array.isRequired,
  fetchPopularRecipes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fetchedPopularRecipes: state.popularRecipes.fetchedPopularRecipes
});

const mapDispatchToProps = dispatch => ({
  fetchPopularRecipes: () => dispatch(fetchPopularRecipesRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularRecipes);