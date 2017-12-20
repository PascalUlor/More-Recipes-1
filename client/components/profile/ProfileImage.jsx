import React, { Component } from 'react';

class ProfileImage extends Component {
    render() {
        return (
            <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <figure className="figure">
                    <img src="/images/profile.jpg" width="200" height="50" className="figure-img img-fluid rounded" alt="Site Logo"/>
                    <figcaption className="figure-caption text-center">
                        <h3>Profile Picture</h3>
                    </figcaption>
                </figure>
            </div>
        );
    }
}

export default ProfileImage;