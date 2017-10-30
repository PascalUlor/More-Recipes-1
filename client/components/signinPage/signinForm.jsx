import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        return (
            // <!--Form Section Start-->
            <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                <h2>Sign In</h2>
                <p className="lead">Don&#39;t have a More-Recipes account? <Link to="/api/v1/user/signup">Sign Up</Link>
                </p>
                <form role="form" onSubmit={this.handleSubmit}>
                    <div className="form-group pb-3 pt-1">
                        <label htmlFor="user">Username</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">
                                <i className=" fa fa-user-circle-o " aria-hidden="true "></i>
                            </div>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                                placeholder="enter username"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </div>
                            <input
                                type="password"
                                className="form-control form-control-sm"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                placeholder="enter password"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline-success">Sign In</button>
                </form>
            </div>
        // <!--Form Section End-->
        );
    }
}