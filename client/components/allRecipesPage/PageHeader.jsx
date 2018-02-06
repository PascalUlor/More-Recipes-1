import React from 'react';


/**
 * @description displays a page title/header
 * @method PageHeader
 *
 * @returns { jsx } jsx - renders PageHeader component
 */
const PageHeader = () => (
  <section className="cover text-center mb-3">
    <h3 className="page-text">All Recipes</h3>
    <hr id="favorites"/>
  </section>
);

export default PageHeader;
