import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';


/**
 * @description HOC for FlashMessage component
 *
 * @class FlashMessage
 *
 * @extends Component
 */
export class FlashMessage extends Component {
  /**
   * @description displays succes or error flash message
   *
   * @returns { jsx } jsx - renders FlashMessage components
   */
  render() {
    const { message } = this.props;
    return (
      <div className={classnames('text-center alert', {
        'alert-success': message.type === 'Success',
        'alert-danger': message.type === 'error'
      })}>
        {message.text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string
  }).isRequired
};
/**
 * @description maps redux state to props
 *
 * @param { object } state - holds flash message state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  message: state.flashMessage
});

export default connect(mapStateToProps)(FlashMessage);
