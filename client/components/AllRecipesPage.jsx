import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from './HomePage/homeNavbar.jsx';
import PageHeader from './allRecipesPage/PageHeader.jsx';
import AllRecipes from './allRecipesPage/allRecipes.jsx';
import Pagination from './pagination/Index.jsx';
import PopularRecipes from './allRecipesPage/popularRecipes.jsx';
import Footer from './footer.jsx';
import { fetchPopularRecipesRequest } from '../actions/actionCreators/popularRecipesActions';
import { fetchAllRecipesRequest } from '../actions/actionCreators/getAllRecipesActions';


class AllRecipesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allRecipes: [],
            popularRecipes: []
        };
    }
    componentDidMount() {
        this.props.fetchAllRecipesRequest(() => {
            if (this.props.fetchedAllRecipes.length !== 0) {
                this.setState({ allRecipes: this.props.fetchedAllRecipes });
            }
        });
        this.props.fetchPopularRecipesRequest(() => {
            if (this.props.fetchedPopularRecipes.length !== 0) {
                this.setState({ popularRecipes: this.props.fetchedPopularRecipes });
            }
        });
    }
    render() {
        const { allRecipes, popularRecipes } = this.state;
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
                                        <Pagination/>
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
    fetchPopularRecipesRequest: PropTypes.func.isRequired,
    fetchAllRecipesRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isRecipesFetching: state.popularRecipes.isPopularRecipesFetching,
    fetchedPopularRecipes: state.popularRecipes.fetchedPopularRecipes,
    isAllRecipesFetching: state.allRecipes.isAllRecipesFetching,
    fetchedAllRecipes: state.allRecipes.fetchedAllRecipes
});

export default connect(mapStateToProps, { fetchPopularRecipesRequest, fetchAllRecipesRequest })(AllRecipesPage);
