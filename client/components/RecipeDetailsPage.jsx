import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/** ***************************** RECIPE DETAILS COMPONENTS  *************************************** */
import NavBar from './HomePage/homeNavbar.jsx';
import TopContents from './recipeDetailsPage/TopContents.jsx';
import Ingredients from './recipeDetailsPage/Ingredients.jsx';
import Procedures from './recipeDetailsPage/Procedures.jsx';
import ReviewsForm from './recipeDetailsPage/ReviewsForm.jsx';
import Reviews from './recipeDetailsPage/Reviews.jsx';
import Footer from './footer.jsx';
/** ****************************** RECIPE DETAILS ACTIONS  ****************************************** */
import setCurrentRecipeRequest from '../actions/actionCreators/setCurrentRecipeActions';
import postReviewRequest from '../actions/actionCreators/postReviewActions';

class RecipeDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topContents: {
        title: '', recipeImage: '', upvotes: 0, downvotes: 0, createdBy: '', lastUpdated: '',
      },
      ingredients: '',
      procedures: '',
      reviews: [],
      recipeId: 0
    };
  }

  componentDidMount() {
    const recipeId = parseInt(this.props.match.params.id, 10);
    this.props.setCurrentRecipeRequest(recipeId);
    this.setState({ recipeId });
  }
  componentWillReceiveProps(nextProps) {
    const {
      title, ingredients, procedures,
      recipeImage, upvotes, downvotes,
      User, updatedAt, Reviews
     } = nextProps.recipeDetails.recipe;
    if (nextProps.recipeDetails.recipe.title) {
      this.setState({
        topContents: {
          title,
          ingredients,
          procedures,
          recipeImage,
          upvotes,
          downvotes,
          lastUpdated: updatedAt,
          createdBy: User.fullName
        },
        ingredients,
        procedures,
        reviews: Reviews
      });
    }
  }

  render() {
    return (
      <div>
        <div className="site-wrapper">
          <NavBar/>
          <div className="container">
            <main className="pl-4 pr-3 mt-4">
              <TopContents details={this.state.topContents}/>
              <div className="row mb-4">
                <Ingredients ingredients={this.state.ingredients}/>
                <div className="col-1"></div>
                <Procedures procedures={this.state.procedures}/>
              </div>
              <ReviewsForm postReview={this.props.postReviewRequest} recipeId={this.state.recipeId}/>
              <Reviews reviews={this.state.reviews}/>
            </main>
          </div>
        </div>
        <Footer id="homeFooter"/>
      </div>
    );
  }
}

RecipeDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
  setCurrentRecipeRequest: PropTypes.func.isRequired,
  recipeDetails: PropTypes.object.isRequired,
  postReviewRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    recipeDetails: state.setCurrentRecipe.currentSetRecipe
  }
);

export default connect(mapStateToProps, { setCurrentRecipeRequest, postReviewRequest })(RecipeDetailsPage);
