import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyRecipe from './MyRecipe.jsx';

class MyRecipesList extends Component {
    render() {
        return (
            <div className="card-deck mb-5 mt-3">
                {this.props.myRecipes.length === 0 ?
                    <div className='display-4 text-center text-danger'>
                        There are no available recipes to display
                    </div> :
                    this.props.myRecipes
                    .sort((a, b) => b.id - a.id)
                    .map((myRecipe, index) =>
                        (index <= 5) && <MyRecipe key={myRecipe.id} myRecipe={myRecipe} />)
                }
            </div>
        );
    }
}

MyRecipesList.propTypes = {
    myRecipes: PropTypes.array.isRequired
};

export default MyRecipesList;