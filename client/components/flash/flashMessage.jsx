import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends React.Component {
  render() {
    const { type, text } = this.props.message;
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'Success',
        'alert-danger': type === 'error'
      })}>
      {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired
};

export default FlashMessage;