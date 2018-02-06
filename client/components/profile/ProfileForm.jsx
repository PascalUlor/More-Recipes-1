import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import TextFieldGroup from '../../common/TextFieldGroup.jsx';


/**
 * @description displays user profile details
 * @method ProfileForm
 * 
 * @param { object } props - object of functions and user profile details
 * 
 * @returns { jsx } jsx - renders ProfileForm component
 */
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
    <form role="form" onSubmit={handleSubmit}>
      <div className="row">
        <div className=
          "col-6 col-sm-3 col-md-4 col-lg-4 figure">
          <figure className="figure">
            <img src={profileImage} id="profile-image"
              onClick={handleClick} className="rounded-circle img-fluid"
              alt="Site Logo"/>
          </figure>
          <input type="file" name="imageFile" className="file-chooser"
            onChange={handleImageChange} accept="image/*"/>
        </div>
        <div className="col-10 col-sm-9 col-md-8 col-lg-6 profile-text">
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
              name='location' error={errors.location}
              value={location} onChange={handleChange} onFocus={handleFocus}
              placeholder='enter city where you are. eg: lagos'/>
            <div className="form-group">
              <label className="page-text" htmlFor="about">About Me</label>
              <textarea rows="5" className="form-control"
                name= "aboutMe" value={aboutMe} onChange={handleChange}
                onFocus={handleFocus} placeholder="write about yourself">
              </textarea>
              {
                errors.aboutMe &&
                <span className="text-danger small">
                  {errors.aboutMe}
                </span>
              }
          </div>
          <div className="text-right">
            <button type="submit"
              className="btn btn-outline-info"
              disabled={isUpdating}>
            { 
              !isUpdating ? 'Save Changes' :
                <span>Saving... <Spinner size={20}/>
                </span>
            }
            </button>
          </div>
        </div>
      </div>
    </form>
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
