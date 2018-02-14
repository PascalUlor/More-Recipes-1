import React from 'react';
import { Link } from 'react-router-dom';


/**
 * @description displays site logo
 *
 * @returns { jsx } jsx - renders site logo component
 */
const SigninSignupImage = () => (
  <div className= "col-4 col-sm-4 col-md-4 col-lg-4">
    <figure className="figure">
      <Link to="/">
        <img src="/images/logo.png" width="200" height="70"
          className="figure-img img-fluid rounded" alt="More Recipes Logo"/>
        <figcaption className="figure-caption text-center">
          <h3 id="site-name">More Recipes</h3>
        </figcaption>
      </Link>
    </figure>
  </div>
);

export default SigninSignupImage;
