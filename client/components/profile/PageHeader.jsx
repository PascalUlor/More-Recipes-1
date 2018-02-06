import React from 'react';


/**
 * @description displays a page title/header
 * @method PageHeader
 *
 * @returns { jsx } jsx - renders PageHeader component
 */
const PageHeader = () => (
  <section className="cover text-center">
    <div className="col">
      <h3 className="page-header p-2 mb-1">My Profile</h3>
    </div>
    <hr id="favorites"/>
  </section>
);

export default PageHeader;