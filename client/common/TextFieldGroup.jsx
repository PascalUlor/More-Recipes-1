import React from 'react';
import PropTypes from 'prop-types';


/**
 * @description defines TextFieldGroup component
 *
 * @param { object } props - contains TextFieldGroup properties
 *
 * @returns { jsx } jsx - renders Text Field Group component
 */
const TextFieldGroup = (props) => {
  const {
    name, label, font, type, value,
    onChange, onFocus, placeholder, error
  } = props;
  return (
    <div className='form-group'>
      <label className="page-text" htmlFor={name}>{label}</label>
      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
        <div className="input-group-addon page-text">
          <i className={font} aria-hidden="true"></i>
        </div>
        <input
          type={type}
          className="form-control form-control-sm"
          id={name}
          name={name}
          defaultValue={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}/>
      </div>
      {error && <span className="text-danger small">{error}</span>}
    </div>
  );
};

// PropType validations
TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  font: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func
};

// default PropType
TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
