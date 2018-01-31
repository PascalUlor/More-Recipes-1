import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import toastr from 'toastr';
import Spinner from 'react-md-spinner';
/** ***************************** USER RECIPES COMPONENTS  *************************************** */
import NavBar from './NavBar.jsx';
import PageHeader from './userRecipesPage/PageHeader.jsx';
import MainContents from './userRecipesPage/mainContents/Index.jsx';
import CreateRecipeButton from './userRecipesPage/mainContents/CreateRecipeButton.jsx';
import MyRecipesList from './userRecipesPage/mainContents/myRecipes/MyRecipesList.jsx';
import CreateRecipeModal from './userRecipesPage/mainContents/CreateRecipeModal.jsx';
import EditRecipeModal from './userRecipesPage/mainContents/EditRecipeModal.jsx';
import DeleteRecipeModal from './DeleteRecipeModal.jsx';
import Footer from './Footer.jsx';
/** ****************************** USER RECIPE ACTIONS  ****************************************** */
import checkDoubleRecipeTitleRequest from '../actions/actionCreators/checkDoubleRecipeTitle';
import createRecipeRequest from '../actions/actionCreators/createRecipeActions';
import fetchUserRecipesRequest from '../actions/actionCreators/getUserRecipesActions';
import setCurrentRecipeRequest from '../actions/actionCreators/setCurrentRecipeActions';
import deleteRecipeRequest from '../actions/actionCreators/deleteRecipeActions';
import updateRecipeRequest from '../actions/actionCreators/editRecipeActions';
import { deleteSelectedRecipe, fetchCurrentPageRecipes } from '../utils/deleteSelectedRecipe';


class UserRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRecipes: [],
      recipeId: null,
      numberOfRecipes: 0,
      pageSize: 0,
      currentPage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
  }
  componentDidMount() {
    const { fetchUserRecipes } = this.props;
    fetchUserRecipes(1);
  }
  componentWillReceiveProps(nextProps) {
    const { userRecipes, selectedRecipeId, paginationDetails } = nextProps,
    { currentPage, limit, numberOfRecipes } = paginationDetails;
    this.setState({
      myRecipes: userRecipes,
      currentPage,
      numberOfRecipes,
      pageSize: limit,
      recipeId: selectedRecipeId
    });
  }
  handleDeleteRecipe() {
    const { currentPage, recipeId } = this.state,
      { deleteRecipe, fetchUserRecipes } = this.props;
    deleteSelectedRecipe(deleteRecipe, recipeId)
    .then(() => {
      const {
        deleteSuccess, deleteError, isFetching, userRecipes,
      } = this.props;
      fetchCurrentPageRecipes(
        deleteSuccess, deleteError, fetchUserRecipes,
        isFetching, userRecipes, currentPage, toastr
      );
    });
  }
  handlePageChange(page) {
    const { fetchUserRecipes } = this.props;
    fetchUserRecipes(page);
  }

  render() {
    const {
    myRecipes, currentPage, pageSize, numberOfRecipes
  } = this.state,
  {
    checkDoubleRecipeTitle, createRecipe, updateRecipe, isFetching, setCurrentRecipe
  } = this.props;
    return (
      <div className="bg-faded">
        <div className="site-wrapper">
          <NavBar/>
          <main className="main-wrapper">
            <div className="container">
              <PageHeader/>
              <MainContents>
                <CreateRecipeButton/>
                {isFetching ?
                  <div className="text-center">
                    <Spinner size={50} className="mt-5 mb-5"/>
                  </div>
                :
                  <div className="col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1 p-0">
                    <MyRecipesList
                      myRecipes={myRecipes}
                      setCurrentRecipe={setCurrentRecipe}/>
                    {(numberOfRecipes > 6 && typeof numberOfRecipes !== 'undefined') &&
                    <Pagination
                      onChange={this.handlePageChange}
                      current={currentPage}
                      pageSize={pageSize || 0}
                      total={numberOfRecipes}
                      className="pagination"
                    />}
                  </div>
                }
                <CreateRecipeModal
                  checkDoubleRecipeTitle={checkDoubleRecipeTitle}
                  createRecipe={createRecipe}
                />
                <EditRecipeModal
                  checkDoubleRecipeTitle={checkDoubleRecipeTitle}
                  updateRecipe={updateRecipe}/>
                <DeleteRecipeModal handleDelete={this.handleDeleteRecipe}/>
              </MainContents>
            </div>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

UserRecipesPage.propTypes = {
  selectedRecipeId: PropTypes.number.isRequired,
  checkDoubleRecipeTitle: PropTypes.func.isRequired,
  createRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  userRecipes: PropTypes.array.isRequired,
  fetchUserRecipes: PropTypes.func.isRequired,
  paginationDetails: PropTypes.shape().isRequired,
  setCurrentRecipe: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.string,
  deleteError: PropTypes.string,
};

const mapStateToProps = state => ({
  isFetching: state.userRecipes.isUserRecipesFetching,
  userRecipes: state.userRecipes.fetchedUserRecipes,
  paginationDetails: state.userRecipes.paginationDetails,
  selectedRecipeId: state.setCurrentRecipe.currentSetRecipeId,
  deleteSuccess: state.deleteUserRecipe.deleteRecipeSuccess,
  deleteError: state.deleteUserRecipe.deleteRecipeError
});
const mapDispatchToProps = dispatch => ({
  fetchUserRecipes: page => dispatch(fetchUserRecipesRequest(page)),
  setCurrentRecipe: recipeId => dispatch(setCurrentRecipeRequest(recipeId)),
  checkDoubleRecipeTitle: recipeTitle => dispatch(checkDoubleRecipeTitleRequest(recipeTitle)),
  createRecipe: recipe => dispatch(createRecipeRequest(recipe)),
  deleteRecipe: recipeId => dispatch(deleteRecipeRequest(recipeId)),
  updateRecipe: recipe => dispatch(updateRecipeRequest(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipesPage);