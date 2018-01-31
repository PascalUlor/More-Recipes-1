import React from 'react';
import PropTypes from 'prop-types';

const Procedures = (props) => {
  const procedures = props.procedures.split('.');
  return (
    <div className="col-md-7 col-lg-7">
      <h5 className="page-text font-weight-bold pb-2">Procedures</h5>
      <ul className="list-group list-group-flush text-muted details break-word">
        {procedures.map((procedure, index) => (
          (procedure.trim()) &&
          <li key={index}>
            <i className="fa fa-check-square-o pr-2 maroon" aria-hidden="true"></i>{procedure.trim()}
          </li>
        ))}
      </ul>
    </div>
  );
};

Procedures.propTypes = {
  procedures: PropTypes.string.isRequired
};

export default Procedures;
