import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


/**
 * @description displays a list of reviews for recipe
 * @method ReviewsList
 *
 * @param { arrary } reviews - array of reviews for a recipe
 *
 * @returns { jsx } jsx - renders ReviewsList component
 */
const ReviewsList = ({ reviews }) => (
  reviews
    .sort((a, b) => ((b.id - a.id)))
    .map((review, index) => (
      <div className="reviews" key={review.id}>
        <img src={review.profileImage || '/images/nophoto.jpg'}
          className="img-fluid figure-img rounded review-profile-image"
          alt="profile image"/>
        <div className="d-inline-block mt-5 pl-2">
          <small className="d-block font-weight-bold">{review.username}</small>
          <small className="font-italic text-muted">
          Posted - { moment(new Date(review.createdAt)).fromNow()}</small>
        </div>
        <small className="d-block break-word">{review.reviewBody}</small>
        { (index < reviews.length - 1) && <hr className="mb-0 pb-0"/>}
      </div>
    ))
);

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape())
};

export default ReviewsList;
