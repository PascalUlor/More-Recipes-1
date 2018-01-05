import React from 'react';
import PropTypes from 'prop-types';

const ReviewsList = ({ reviews }) => (
  reviews
  .sort((a, b) => ((b.id - a.id)))
  .map((review, index) => (
    <div className="reviews" key={review.id}>
      <img src={review.profileImage || '/images/nophoto.jpg'} id="profile_image" className="img-fluid figure-img rounded" alt="profile image"/>
      <div className="d-inline-block mt-5 pl-2">
      <small className="d-block font-weight-bold">{review.username}</small>
      <small className="font-italic text-muted">Posted - {review.createdAt}</small>
      </div>
      <small className="d-block">{review.reviewBody}</small>
      { (index < reviews.length - 1) && <hr className="mb-0 pb-0"/>}
    </div>
  ))
);

ReviewsList.propTypes = {
reviews: PropTypes.array.isRequired
};

export default ReviewsList;
