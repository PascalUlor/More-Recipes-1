import React, { Component } from 'react';
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


class UserRecipesPage extends Component {
    render() {
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
                                <CreateRecipeModal/>
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

export default UserRecipesPage;