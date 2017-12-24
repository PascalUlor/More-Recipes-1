import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import TextFieldGroup from '../../common/textFieldGroup.jsx';
import validateInputs from '../../shared/validations/profile';
import { updateProfileRequest } from '../../actions/actionCreators/profileActions';

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }
    isValid() {
        const { errors, isValid } = validateInputs(this.props.profile);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }
    handleClick() {
        $('input[type=file]').click();
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {} });
            this.props.updateProfileRequest(this.props.profile, () => {
            if (this.props.updateProfileError === '') {
                toastr.clear();
                toastr.success(this.props.updatedProfile.message);
            } else {
                toastr.clear();
                toastr.error(this.props.updateProfileError);
            }
            });
        }
    }
    render() {
        const {
            fullName,
            username,
            email,
            location,
            aboutMe,
            profileImage
        } = this.props.profile,
        { errors } = this.state,
        { isProfileUpdating } = this.props,
        profileForm = (
            <div className="row">
                <div className="col-4 col-sm-4 col-md-4 col-lg-4 mt-1">
                    <figure className="figure">
                        <img src={profileImage} id="profileImage"
                            onClick={this.handleClick} className="rounded-circle img-fluid" alt="Site Logo"/>
                        <figcaption className="figure-caption text-center">
                            <h6 className="mt-2">Profile Picture</h6>
                        </figcaption>
                    </figure>
                    <input type="file" name="imageFile" onChange={this.props.handleImageChange} accept="image/*" style={{ display: 'none' }}/>
                </div>
                <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                    <h2>Basic Information</h2>
                    <form role="form" onSubmit={this.handleSubmit}>
                        <TextFieldGroup
                            label='Full Name' font="fa fa-user-circle-o" name='fullName' value={fullName}
                            error={errors.fullName} onChange={this.props.handleChange} placeholder='firstname lastname'/>
                        <TextFieldGroup
                            label='Username' font="fa fa-user-circle-o" name='username' value={username}
                            error={errors.username} onChange={this.props.handleChange} placeholder='enter username'/>
                        <TextFieldGroup
                            label='Email' font="fa fa-envelope" name='email' value={email} error={errors.email}
                            onChange={this.props.handleChange} placeholder='enter email'/>
                        <TextFieldGroup
                            label='Location' font="fa fa-map-marker" name='location' value={location} error={errors.location}
                            onChange={this.props.handleChange} placeholder='enter city where you are. eg: lagos'/>
                        <div className="form-group">
                            <label htmlFor="about">About Me</label>
                            <textarea rows="5" className="form-control" name= "aboutMe" value={aboutMe} onChange={this.props.handleChange}
                            placeholder="write about yourself"></textarea>
                            {errors.aboutMe && <span className="text-danger small">{errors.aboutMe}</span>}
                        </div>
                        <button type="submit" className="btn btn-outline-info" disabled={isProfileUpdating}>
                        { !isProfileUpdating ? 'Save Changes' : <span>Saving... <Spinner size={20} /></span> }
                        </button>
                    </form>
                </div>
            </div>
        );
        return (
            <div>
                {this.props.profile.fullName === '' ? <Spinner size={40} style={{ margin: '20% 50%' }}/> : profileForm}
            </div>
        );
    }
}

ProfileForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleImageChange: PropTypes.func.isRequired,
    profile: PropTypes.object,
    updateProfileRequest: PropTypes.func.isRequired,
    isProfileUpdating: PropTypes.bool.isRequired,
    updatedProfile: PropTypes.object,
    updateProfileError: PropTypes.string
};

const mapStateToProps = state => ({
    isProfileUpdating: state.userProfile.isProfileUpdating,
    updatedProfile: state.userProfile.updatedProfile,
    updateProfileError: state.userProfile.updateProfileError,
});

export default connect(mapStateToProps, { updateProfileRequest })(ProfileForm);