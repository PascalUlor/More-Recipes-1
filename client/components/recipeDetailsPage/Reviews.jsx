import React, { Component } from 'react';

class Reviews extends Component {
  render() {
    return (
      <section className="mb-5">
        <h5 className="text-muted mt-4 mb-3 pt-3">Reviews</h5>
        <div className="card">
          <div className="card-header pl-3 pt-0 m-0">
            <div className="reviews">
              <img src="/images/nophoto.jpg" id="profile_image" className="img-fluid figure-img rounded" alt="profile image"/>
              <div className="d-inline-block mt-5 pl-2">
                <small className="d-block font-weight-bold">cool_chyke</small>
                <small className="font-italic text-muted">Posted - 2 hours ago</small>
              </div>
              <small className="d-block">I really loved your recipe. Great job.</small>
            </div>
            <hr className="mb-0 pb-0" />
            <div className="reviews">
              <img src="/images/nophoto.jpg" id="profile_image" className="img-fluid figure-img rounded" alt="profile image"/>
              <div className="d-inline-block mt-5 pl-2">
                <small className="d-block font-weight-bold">cool_chyke</small>
                <small className="font-italic text-muted">Posted - 2 hours ago</small>
              </div>
              <small className="d-block">I really loved your recipe. Great jobI really loved your recipe. GreI really loved your recipe. Great jobI really loved your recipe. Great jobat jobI really loved your recipe. Great jobI really loved your recipe. Great job.</small>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Reviews;
