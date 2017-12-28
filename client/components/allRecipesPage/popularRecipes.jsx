import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopularRecipesList from './popularRecipes/popularRecipesList.jsx';


class PopularRecipes extends Component {
    render() {
        const { popularRecipes } = this.props;
        return (
            <div className="card mb-5">
                <div className="card-body">
                    <PopularRecipesList popularRecipes={popularRecipes}/>
                </div>
            </div>
        );
    }
}

PopularRecipes.propTypes = {
    isRecipeFetching: PropTypes.bool.isRequired,
    popularRecipes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    isRecipeFetching: state.popularRecipes.isPopularRecipesFetching
});

export default connect(mapStateToProps)(PopularRecipes);