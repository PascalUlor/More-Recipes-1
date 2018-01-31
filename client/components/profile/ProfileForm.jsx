import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import TextFieldGroup from '../../common/TextFieldGroup.jsx';

const ProfileForm = (props) => {
  const {
    handleChange, handleFocus, handleClick, handleImageChange,
    handleSubmit, isUpdating
  } = props,
  {
    fullName, username, email, location,
    aboutMe, profileImage, errors
  } = props.profile;
  return (
    <div className="row">
      <div className="col-4 col-sm-4 col-md-4 col-lg-4 mt-1">
        <figure className="figure">
          <img src={profileImage} id="profile-image"
            onClick={handleClick} className="rounded-circle img-fluid" alt="Site Logo"/>
          <figcaption className="figure-caption text-center">
            <h6 className="mt-2">Profile Picture</h6>
          </figcaption>
        </figure>
        <input type="file" name="imageFile" className="file-chooser"
          onChange={handleImageChange} accept="image/*"/>
      </div>
      <div className="col-8 col-sm-8 col-md-8 col-lg-8">
        <h2>Basic Information</h2>
        <form role="form" onSubmit={handleSubmit}>
          <TextFieldGroup
            label='Full Name' font="fa fa-user"
            name='fullName' value={fullName}
            error={errors.fullName} onChange={handleChange}
            onFocus={handleFocus} placeholder='firstname lastname'/>
          <TextFieldGroup
            label='Username' font="fa fa-user"
            name='username' value={username}
            error={errors.username} onChange={handleChange}
            onFocus={handleFocus} placeholder='enter username'/>
          <TextFieldGroup
            label='Email' font="fa fa-envelope"
            name='email' value={email}
            error={errors.email} onChange={handleChange}
            onFocus={handleFocus} placeholder='enter email'/>
          <TextFieldGroup
            label='Location' font="fa fa-map-marker"
            name='location' value={location}
            error={errors.location} onChange={handleChange}
            onFocus={handleFocus} placeholder='enter city where you are. eg: lagos'/>
          <div className="form-group">
            <label htmlFor="about">About Me</label>
            <textarea rows="5" className="form-control"
              name= "aboutMe" value={aboutMe} onChange={handleChange}
              onFocus={handleFocus} placeholder="write about yourself">
            </textarea>
            {errors.aboutMe && <span className="text-danger small">{errors.aboutMe}</span>}
          </div>
          <button type="submit" className="btn btn-outline-info" disabled={isUpdating}>
           { !isUpdating ? 'Save Changes' : <span>Saving... <Spinner size={20} /></span> }
          </button>
        </form>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleImageChange: PropTypes.func.isRequired,
    profile: PropTypes.shape(),
    isUpdating: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default ProfileForm;