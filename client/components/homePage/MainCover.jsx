import React from 'react';
import { Link } from 'react-router-dom';

const MainCover = () => (
  <main className="landing">
    <div className="overlay">
      <div className="container">
        <section className="cover-caption">
          <h1 className="display-3">Share Your Special Recipe Ideas Instantly</h1>
          <p id="sub-title" className="lead">More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt, get feedback in form of reviews and votes from other users who explore that recipe</p>
          <Link className="btn btn-lg btn-warning mt-3" to="/signup" role="button">Get Started</Link>
          <p className="lead beautify">Already Registered?
            <Link className="btn btn-link" to="/signin" role="button">Sign In</Link>
          </p>
        </section>
      </div>
    </div>
  </main>
);

export default MainCover;