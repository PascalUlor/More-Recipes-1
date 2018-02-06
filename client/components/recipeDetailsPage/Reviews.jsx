import React from 'react';
import PropTypes from 'prop-types';
import ReviewsList from './ReviewsList.jsx';


/**
 * @description displays a list of reviews for recipe
 * @method Reviews
 * 
 * @param { arrary } reviews - array of reviews for a recipe
 * 
 * @returns { jsx } jsx - renders Reviews component
 */
const Reviews = ({ reviews }) => (
  <section className="mb-5">
    <h5 className="page-text font-weight-bold mt-4 mb-3 pt-3">Reviews</h5>
    {
      reviews.length === 0
      ?
        <div className="mt-4 text-muted">
        There are no reviews yet, for this recipe</div>
      :
        (
          <div className="card">
          <div className="card-header pl-3 pt-0 m-0">
            <ReviewsList reviews={reviews}/>
          </div>
          </div>
        )
    }
  </section>
);

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default Reviews;
