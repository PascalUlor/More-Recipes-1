import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
/** ***************************** RECIPE DETAILS COMPONENTS  *************************************** */
import NavBar from './NavBar.jsx';
import TopContents from './recipeDetailsPage/TopContents.jsx';
import Ingredients from './recipeDetailsPage/Ingredients.jsx';
import Procedures from './recipeDetailsPage/Procedures.jsx';
import ReviewsForm from './recipeDetailsPage/ReviewsForm.jsx';
import Reviews from './recipeDetailsPage/Reviews.jsx';
import Footer from './Footer.jsx';
/** ****************************** RECIPE DETAILS ACTIONS  ****************************************** */
import setCurrentRecipeRequest from '../actions/actionCreators/setCurrentRecipeActions';
import postReviewRequest from '../actions/actionCreators/postReviewActions';
import addFlashMessage from '../actions/actionCreators/flashMessage';
import verifyToken from '../utils/verifyToken';
import addFavoriteRequest from '../actions/actionCreators/addFavoriteRecipeActions';
import voteRecipeRequest from '../actions/actionCreators/voteRecipeActions';

class RecipeDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topContents: {
        title: '',
        recipeImage: '',
        upvotes: 0,
        downvotes: 0,
        createdBy: '',
        lastUpdated: '',
      },
      ingredients: '',
      procedures: '',
      reviews: [],
      recipeId: 0
    };
    this.handleFavourite = this.handleFavourite.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }
  componentDidMount() {
    const recipeId = parseInt(this.props.match.params.id, 10);
    this.props.setCurrentRecipe(recipeId);
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
  handleFavourite() {
    const { recipeId } = this.state;
    if (verifyToken()) {
      this.props.addFavorite(recipeId)
      .then(() => {
        if (this.props.addFavoriteSuccess) {
          toastr.remove();
          toastr.success(this.props.addFavoriteSuccess);
        } else {
          toastr.remove();
          toastr.error(this.props.addFavoriteError);
        }
      });
    } else {
      this.props.addFlashMessage({
        type: 'failed',
        text: 'Sorry!!!. Please login to continue'
      });
      this.context.router.history.push('/signin');
    }
  }
  handleVote(event) {
    const { recipeId } = this.state,
    { voteRecipe } = this.props;
    let voteType = null;
    if (event.target.id === 'upvote') {
      voteType = 'upvote';
    } else { voteType = 'downvote'; }
    if (verifyToken()) {
      voteRecipe(recipeId, voteType)
      .then(() => {
        if (this.props.voteSuccessMessage) {
          toastr.remove();
          toastr.success(this.props.voteSuccessMessage);
        } else {
          toastr.remove();
          toastr.error(this.props.voteFailureMessage);
        }
      });
    } else {
      this.props.addFlashMessage({
        type: 'failed',
        text: 'Sorry!!!. Please login to continue'
      });
      this.context.router.history.push('/signin');
    }
  }

  render() {
    return (
      <div className="bg-faded">
        <div className="site-wrapper">
          <NavBar/>
          <div className="container main-wrapper">
            <main className="pl-4 pr-3 mt-4">
              <TopContents
                details={this.state.topContents}
                addFavorite={this.handleFavourite}
                voteRecipe={this.handleVote}
                />
              <div className="row mb-4">
                <Ingredients ingredients={this.state.ingredients}/>
                <div className="col-1"></div>
                <Procedures procedures={this.state.procedures}/>
              </div>
              <ReviewsForm postReview={this.props.postReview} recipeId={this.state.recipeId}/>
              <Reviews reviews={this.state.reviews}/>
            </main>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

RecipeDetailsPage.propTypes = {
  match: PropTypes.shape().isRequired,
  setCurrentRecipe: PropTypes.func.isRequired,
  recipeDetails: PropTypes.shape().isRequired,
  postReview: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  addFavoriteSuccess: PropTypes.string.isRequired,
  addFavoriteError: PropTypes.string.isRequired,
  voteRecipe: PropTypes.func.isRequired,
  voteSuccessMessage: PropTypes.string.isRequired,
  voteFailureMessage: PropTypes.string.isRequired
};

RecipeDetailsPage.contextTypes = {
  router: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
    recipeDetails: state.setCurrentRecipe.currentSetRecipe,
    addFavoriteSuccess: state.addFavoriteRecipe.addFavoriteSuccess,
    addFavoriteError: state.addFavoriteRecipe.addFavoriteError,
    voteSuccessMessage: state.setCurrentRecipe.voteSuccessMessage,
    voteFailureMessage: state.setCurrentRecipe.voteFailureMessage
  }
);

const mapDispatchToProps = dispatch => ({
  setCurrentRecipe: recipeId => dispatch(setCurrentRecipeRequest(recipeId)),
  postReview: (review, recipeId) => dispatch(postReviewRequest(review, recipeId)),
  addFlashMessage: message => dispatch(addFlashMessage(message)),
  addFavorite: recipeId => dispatch(addFavoriteRequest(recipeId)),
  voteRecipe: (recipeId, voteType) => dispatch(voteRecipeRequest(recipeId, voteType))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsPage);
