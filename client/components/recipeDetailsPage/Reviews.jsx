import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewsList from './ReviewsList.jsx';


class Reviews extends Component {
  render() {
    const { reviews } = this.props;
    return (
      <section className="mb-5">
        <h5 className="text-muted mt-4 mb-3 pt-3">Reviews</h5>
        {
          reviews.length === 0 ? <div className="mt-4 text-muted">There are no reviews yet, for this recipe</div> :
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
  }
}

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default Reviews;
