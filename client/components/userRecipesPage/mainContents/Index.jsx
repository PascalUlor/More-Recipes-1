import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Index extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

Index.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Index;