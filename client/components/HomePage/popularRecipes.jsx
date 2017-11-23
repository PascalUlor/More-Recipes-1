import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recipes from './popularRecipes/recipes.jsx';

export default class PopularRecipes extends Component {
    render() {
        return (
            // <!--Section For Page Body Start-->
            <section id="home">
                <div className="container">
                    {/*  <!--Section For Page Body Header/Title Start--> */}
                    <section className="cover text-center mb-3 mt-4">
                        <h3 className="text-info">Popular Recipes</h3>
                        <hr id="favorites"/>
                    </section>
                    {/* <!--Section For Page Body Header/Title End--> */}
                    <Recipes/>
                    <div className="row">
                        <div className="col text-center">
                            <p className="lead font-weight-bold mb-4">Want to view more awesome recipes? <Link to="/signup">Sign Up Now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            // <!--Section For Page Body End-->
    );
  }
}
