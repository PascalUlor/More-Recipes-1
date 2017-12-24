import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextFieldGroup extends Component {
    render() {
        return (
            <div className='form-group'>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon">
                        <i className={this.props.font} aria-hidden="true"></i>
                    </div>
                    <input
                        type={this.props.type}
                        className="form-control form-control-sm"
                        id={this.props.name}
                        name={this.props.name}
                        defaultValue={this.props.value}
                        onChange={this.props.onChange}
                        placeholder={this.props.placeholder}/>
                </div>
                {this.props.error && <span className="text-danger small">{this.props.error}</span>}
            </div>
        );
    }
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    font: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;