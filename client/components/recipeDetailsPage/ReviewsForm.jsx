import React, { Component } from 'react';

class ReviewsForm extends Component {
  render() {
    return (
      <div>
        <h5 className="mt-3 text-success">Post Your Review</h5>
        <div className="col p-0 mb-2">
          <textarea rows="7" className="form-control" placeholder="enter your review for this recipe"></textarea>
        </div>
        <button className="btn btn-outline-success" type="submit">Post Review</button>
      </div>
    );
  }
}

export default ReviewsForm;
