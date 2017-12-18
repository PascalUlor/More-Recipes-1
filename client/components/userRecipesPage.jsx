import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
/** ***************************** USER RECIPES COMPONENTS  *************************************** */
import DashboardNavBar from './dashboard/dashboardNavbar.jsx';
import PageHeader from './userRecipesPage/PageHeader.jsx';
import MainContents from './userRecipesPage/mainContents/Index.jsx';
import CreateRecipeButton from './userRecipesPage/mainContents/CreateRecipeButton.jsx';
import MyRecipes from './userRecipesPage/mainContents/MyRecipes.jsx';
import Pagination from './pagination/Index.jsx';
import CreateRecipeModal from './userRecipesPage/mainContents/CreateRecipeModal.jsx';
import EditRecipeModal from './userRecipesPage/mainContents/EditRecipeModal.jsx';
import DeleteRecipeModal from './deleteRecipeModal/Index.jsx';
import Footer from './footer.jsx';
/** ****************************** USER RECIPE ACTIONS  ****************************************** */
import { doubleRecipeTitleCheck, createRecipeRequest } from '../actions/actionCreators/createRecipeActions';


class UserRecipesPage extends Component {
    render() {
        const { doubleRecipeTitleCheck, createRecipeRequest } = this.props;
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
                                <Pagination/>
                                <CreateRecipeModal doubleRecipeTitleCheck={doubleRecipeTitleCheck} createRecipeRequest={createRecipeRequest}/>
                                <EditRecipeModal/>
                                <DeleteRecipeModal/>
                            </MainContents>
                        </div>
                    </main>
                </div>
                <Footer id='footer'/>
            </div>
        );
    }
}

CreateRecipeModal.propTypes = {
    doubleRecipeTitleCheck: PropTypes.func.isRequired,
    createRecipeRequest: PropTypes.func.isRequired
};

export default connect(null, { doubleRecipeTitleCheck, createRecipeRequest })(UserRecipesPage);