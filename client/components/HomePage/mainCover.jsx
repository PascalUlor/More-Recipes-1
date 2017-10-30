import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MainCover extends Component {
  render() {
    return (
      // <!--Image Cover Main Div Start-->
      <main id="main-wrapper" className="landing">
            <div className="container">
                {/* <!--Section For Main Div Start--> */}
                <section className="cover">
                    <div className="cover-caption">
                        <div className="col">
                            <h1 className="display-3">Share Your Special Recipe Ideas Instantly</h1>
                            <p id="sub-title" className="lead">More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt, get feedback in form of reviews and votes from other users who explore that recipe</p>
                            <Link className="btn btn-lg btn-warning mt-3" to="/api/v1/user/signup" role="button">Get Started</Link>
                            <p className="lead beautify">Already Registered?
                                <Link className="btn btn-link" to="/api/v1/user/signin" role="button">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </section>
                {/* <!--Section For Main Div End--> */}
            </div>
        </main>
        // <!--Image Cover Main Div End-->
    );
  }
}