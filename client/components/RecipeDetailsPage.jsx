import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
/** *************** RECIPE DETAILS COMPONENTS  ********************** */
import NavBar from './NavBar.jsx';
import TopContents from './recipeDetailsPage/TopContents.jsx';
import Ingredients from './recipeDetailsPage/Ingredients.jsx';
import Procedures from './recipeDetailsPage/Procedures.jsx';
import ReviewsForm from './recipeDetailsPage/ReviewsForm.jsx';
import Reviews from './recipeDetailsPage/Reviews.jsx';
import Footer from './Footer.jsx';
/** ***************** RECIPE DETAILS ACTIONS  *************************/
import setCurrentRecipeRequest from
'../actions/actionCreators/setCurrentRecipeActions';
import postReviewRequest from '../actions/actionCreators/postReviewActions';
import verifyToken from '../utils/verifyToken';
import addFavoriteRequest from 
'../actions/actionCreators/addFavoriteRecipeActions';
import voteRecipeRequest from '../actions/actionCreators/voteRecipeActions';
import redirect from '../utils/redirect';


/**
 * @description HOC for rendering a single recipe component
 *
 * @class RecipeDetailsPage
 *
 * @extends Component
 */
class RecipeDetailsPage extends Component {
  /**
   * @description creates an instance of RecipeDetailsPage page
   * 
   * @constructor
   *
   * @param { props } props - contains recipe details component properties
   *
   */
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
        isFavorited: false,
        vote: ''
      },
      ingredients: '',
      procedures: '',
      reviews: [],
      recipeId: 0
    };
    this.handleFavourite = this.handleFavourite.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }
  /**
   * @description handles fetching details of seleted recipe
   * 
   * @method componentDidMount
   *
   * @returns {*} null
   */
  componentDidMount() {
    const recipeId = parseInt(this.props.match.params.id, 10);
    this.props.setCurrentRecipe(recipeId);
    this.setState({ recipeId });
  }
   /**
   * @description receives update on lastest updates
   * @method componentWillReceiveProps
   * 
   * @param {object} nextProps - object of new incoming property
   * 
   * @returns {object} new state
   */
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
          createdBy: User.fullName,
          isFavorited: nextProps.recipeDetails.isFavorited,
          vote: nextProps.recipeDetails.vote
        },
        ingredients,
        procedures,
        reviews: Reviews
      });
    }
  }
  /**
   * @description handles on favoriting a recipe
   * @method handleFavourite
   *
   * @returns {*} null
   */
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
      redirect(this.props);
    }
  }
  /**
   * @description handles on voting a recipe
   * @method handleVote
   *
   * @returns {*} null
   */
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
      redirect(this.props);
    }
  }
  /**
   * @description renders single recipe details
   *
   * @returns { jsx } jsx - renders single recipe details
   */
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
              <ReviewsForm
                postReview={this.props.postReview}
                recipeId={this.state.recipeId}
                {...this.props}/>
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
/**
 * @description maps redux state to props
 *
 * @param { object } state - holds recipe details state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
    recipeDetails: state.setCurrentRecipe.currentSetRecipe,
    addFavoriteSuccess: state.addFavoriteRecipe.addFavoriteSuccess,
    addFavoriteError: state.addFavoriteRecipe.addFavoriteError,
    voteSuccessMessage: state.setCurrentRecipe.voteSuccessMessage,
    voteFailureMessage: state.setCurrentRecipe.voteFailureMessage
  }
);
/**
  * @description maps action dispatch to props
  *
  * @param { object } dispatch - holds dispatchable actions
  *
  * @return { object } props - returns mapped props from dispatch action
  */
const mapDispatchToProps = dispatch => ({
  setCurrentRecipe: recipeId =>
    dispatch(setCurrentRecipeRequest(recipeId)),
  postReview: (review, recipeId) =>
    dispatch(postReviewRequest(review, recipeId)),
  addFavorite: recipeId =>
    dispatch(addFavoriteRequest(recipeId)),
  voteRecipe: (recipeId, voteType) =>
    dispatch(voteRecipeRequest(recipeId, voteType))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsPage);
