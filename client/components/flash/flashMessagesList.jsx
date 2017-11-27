import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlashMessage from './flashMessage.jsx';

class FlashMessagesList extends React.Component {
  render() {
    // const { messages } = this.props.messages,
    const message = <FlashMessage message={this.props.messages} />;
    return (
      <div className='text-center'>{message}</div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  };
}

export default connect(mapStateToProps)(FlashMessagesList);