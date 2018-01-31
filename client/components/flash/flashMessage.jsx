import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const FlashMessage = ({ message }) => (
  <div className={classnames('alert', {
    'alert-success': message.type === 'Success',
    'alert-danger': message.type === 'error'
  })}>
    {message.text}
  </div>
);

FlashMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string
  }).isRequired
};

export default FlashMessage;