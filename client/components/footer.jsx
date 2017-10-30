import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
    render() {
        return (
            //  <!--Page Footer Start-->
            <footer id={this.props.id}>
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-12 col-sm-8 col-md-9 col-lg-10">
                            <small id="copywrite" className="text-white">&copy;2017 Bootcamp27, Andela Nigeria. All rights reserved.</small>
                        </div>
                        <div className="col-12 col-sm-4 col-md-3 col-lg-2">
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
            // <!--Page Footer End-->
        );
    }
}

Footer.propTypes = {
  id: PropTypes.string.isRequired
};