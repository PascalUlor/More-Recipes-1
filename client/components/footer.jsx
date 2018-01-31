import React from 'react';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="row mt-4">
        <div className="col-12 col-sm-8 col-md-9 col-lg-10">
          <small id="copywrite" className="text-white"><span className="text-warning">&copy;2018 </span>
          Bootcamp27, Andela Nigeria. All rights reserved.</small>
        </div>
        <div className="col-12 col-sm-4 col-md-3 col-lg-2 text-center">
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-google-plus" aria-hidden="true"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-github"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;