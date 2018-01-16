import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/** ***************************** USER RECIPES COMPONENTS  *************************************** */
import DashboardNavBar from './dashboard/dashboardNavbar.jsx';
import PageHeader from './userRecipesPage/PageHeader.jsx';
import MainContents from './userRecipesPage/mainContents/Index.jsx';
import CreateRecipeButton from './userRecipesPage/mainContents/CreateRecipeButton.jsx';
import MyRecipes from './userRecipesPage/mainContents/MyRecipes.jsx';
import CreateRecipeModal from './userRecipesPage/mainContents/CreateRecipeModal.jsx';
import EditRecipeModal from './userRecipesPage/mainContents/EditRecipeModal.jsx';
import DeleteRecipeModal from './deleteRecipeModal/Index.jsx';
import Footer from './footer.jsx';
/** ****************************** USER RECIPE ACTIONS  ****************************************** */
import { doubleRecipeTitleCheck, createRecipeRequest } from '../actions/actionCreators/createRecipeActions';
import deleteRecipeRequest from '../actions/actionCreators/deleteRecipeActions';
import updateRecipeRequest from '../actions/actionCreators/editRecipeActions';


class UserRecipesPage extends Component {
  render() {
    const {
      doubleRecipeTitleCheck, createRecipeRequest, deleteRecipeRequest, updateRecipeRequest
    } = this.props;
    return (
      <div>
        <div className="site-wrapper">
          <DashboardNavBar/>
          <main id="main-wrapper">
            <div className="container">
              <PageHeader/>
              <MainContents>
                <CreateRecipeButton/>
                <MyRecipes/>
                <div className="col-10 offset-1 offet-sm-1 offset-md-1 offset-lg-1">
                </div>
                <CreateRecipeModal doubleRecipeTitleCheck={doubleRecipeTitleCheck} createRecipeRequest={createRecipeRequest}/>
                <EditRecipeModal doubleRecipeTitleCheck={doubleRecipeTitleCheck} updateRecipeRequest={updateRecipeRequest}/>
                <DeleteRecipeModal deleteRecipeRequest={deleteRecipeRequest}/>
              </MainContents>
            </div>
          </main>
        </div>
        <Footer id='homeFooter'/>
      </div>
    );
  }
}

UserRecipesPage.propTypes = {
  doubleRecipeTitleCheck: PropTypes.func.isRequired,
  createRecipeRequest: PropTypes.func.isRequired,
  deleteRecipeRequest: PropTypes.func.isRequired,
  updateRecipeRequest: PropTypes.func.isRequired
};

export default connect(null, { doubleRecipeTitleCheck, createRecipeRequest, deleteRecipeRequest, updateRecipeRequest })(UserRecipesPage);