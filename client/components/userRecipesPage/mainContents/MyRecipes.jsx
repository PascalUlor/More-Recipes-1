import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyRecipesList from './myRecipes/MyRecipesList.jsx';
import { fetchRecipesRequest } from '../../../actions/actionCreators/getUserRecipesActions';


class MyRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myRecipes: []
        };
    }
    componentDidMount() {
        this.props.fetchRecipesRequest(() => {
            if (this.props.fetchedUserRecipes.length !== 0) {
                this.setState({ myRecipes: this.props.fetchedUserRecipes });
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.fetchedUserRecipes.length !== this.state.myRecipes.length) {
            this.setState({ myRecipes: nextProps.fetchedUserRecipes });
        }
    }

    render() {
        return (
            //  <!--Section For Main Div End-->
            <div className="col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1">
                <MyRecipesList myRecipes={this.state.myRecipes}/>
            </div>
        );
    }
}

MyRecipes.propTypes = {
    isRecipeFetching: PropTypes.bool.isRequired,
    fetchedUserRecipes: PropTypes.array.isRequired,
    fetchRecipesRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isRecipeFetching: state.userRecipes.isUserRecipesFetching,
    fetchedUserRecipes: state.userRecipes.fetchedUserRecipes
});

export default connect(mapStateToProps, { fetchRecipesRequest })(MyRecipes);