import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage.jsx';

class FlashMessagesList extends Component {
  render() {
    const message = <FlashMessage message={this.props.message} />;
    return (
      <div className='text-center'>{message}</div>
    );
  }
}

FlashMessagesList.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  message: state.flashMessage
});

export default connect(mapStateToProps)(FlashMessagesList);