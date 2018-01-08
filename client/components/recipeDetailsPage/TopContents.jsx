import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TopContents extends Component {
  render() {
    const { title, recipeImage, upvotes, downvotes, createdBy } = this.props.details,
    { addFavorite } = this.props;
    return (
      <div className="row mb-4">
        <div className="col-md-8 col-lg-8 mb-3">
          <div className="card">
            <img className="img-fluid" id="recipe_image" src={recipeImage} alt="Card image cap" />
            <div className="card-body">
              <div className=" pt-2 pb-2">
                <div className="row">
                  <div className="col-10 offset-1">
                    <div className="row">
                      <div className="col-3 p-1">
                        <span className="text-success">
                          <i className="fa fa-thumbs-o-up fa-2x action" id="upvote" aria-hidden="true"></i> {upvotes}
                        </span>
                      </div>
                      <div className="col-3 p-1">
                        <span className="text-danger">
                          <i className="fa fa-thumbs-o-down fa-2x action" id="downvote" aria-hidden="true"></i> {downvotes}
                        </span>
                      </div>
                      <div className="col-6 p-1 text-right text-warning">
                        <i className="fa fa-heart-o fa-2x action" id="favorite" onClick={addFavorite}></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-mute text-center font-italic pt-1">
                  <span className="lead text-muted">Last Updated: 07.04.17</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 mb-3">
          <h2 className="text-success font-weight-bold">{title}</h2>
          <p className="lead font-italic p-2 text-muted" id="description">The best african continental dish. Very easy to prepare and less time consuming. Enjoy!</p>
          <div>
            <p className="lead mb-0 font-weight-bold text-success">Time To Prepare</p>
            <span className="maroon"><i className="fa fa-clock-o pl-1"></i><small className="text-muted font-italic" id="time"> 20 mins</small></span>
          </div>
          <div className="pt-3 small"><span className="text-success">By: </span><span className="text-muted">{createdBy}</span></div>
        </div>
      </div>
    );
  }
}

TopContents.propTypes = {
  details: PropTypes.shape().isRequired,
  addFavorite: PropTypes.func.isRequired
};

export default TopContents;