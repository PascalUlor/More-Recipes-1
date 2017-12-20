import React, { Component } from 'react';

class ProfileForm extends Component {
    render() {
        return (
            <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                <h2>Basic Information</h2>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="user">Full name</label>
                        <div className="input-group">
                            <div className="input-group-addon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></div>
                            <input type="text" className="form-control" id="user" placeholder="firstname lastname" value="Chinwoke Hyginus"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user">Username</label>
                        <div className="input-group">
                            <div className="input-group-addon"><i className=" fa fa-user-circle-o " aria-hidden="true"></i></div>
                            <input type="text" className="form-control" id="user" placeholder="enter username" value="Chikebaba"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-group">
                            <div className="input-group-addon"><i className=" fa fa-envelope " aria-hidden="true "></i></div>
                            <input type="email" className="form-control" id="email" placeholder="enter email" value="chikebaba@gmail.com" disabled/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <div className="input-group">
                            <div className="input-group-addon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                            <input type="text" className="form-control" id="location" placeholder="enter city where you are. eg: lagos"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="about">About Me</label>
                        <textarea rows="5" className="form-control" placeholder="write about yourself"></textarea>
                    </div>
                    <button type="submit" className="btn btn-outline-info">Save Changes</button>
                </form>
            </div>
        );
    }
}

export default ProfileForm;