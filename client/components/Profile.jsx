/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Spinner from 'react-md-spinner';
import NavBar from './NavBar.jsx';
import ProfileForm from './profile/ProfileForm.jsx';
import PageHeader from './profile/PageHeader.jsx';
import Footer from './Footer.jsx';
import {
  fetchProfileRequest,
  updateProfileRequest
} from '../actions/actionCreators/profileActions';
import checkImageFile from '../shared/validations/checkImageFile';
import validateInputs from '../shared/validations/profile';


/**
 * @description HOC for user profile component
 *
 * @class Profile
 *
 * @extends Component
 */
export class Profile extends Component {
  /**
   * @description creates an instance of Profile page
   *
   * @constructor
   *
   * @param { props } props - contains all user profile component properties
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      username: '',
      email: '',
      location: '',
      aboutMe: '',
      initialImage: '',
      profileImage: '',
      imageFile: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  /**
   * @description handles fetching user profile details
   *
   * @method componentDidMount
   *
   * @returns {*} null
   */
  componentDidMount() {
    this.props.fetchProfile();
  }
  /**
   * @description receives update on lastest updates
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps - object of new incoming property
   *
   * @returns {*} null
   */
  componentWillReceiveProps(nextProps) {
    let userProfile = {};
    if (typeof nextProps.updatedProfile.updatedUser !== 'undefined') {
      userProfile = nextProps.updatedProfile.updatedUser;
    } else if (typeof nextProps.fetchedProfile !== 'undefined') {
      userProfile = nextProps.fetchedProfile;
    }
    const profileImage = userProfile.profileImage === null ?
      '/images/nophoto.jpg' : userProfile.profileImage;
    this.setState({
      fullName: userProfile.fullName,
      username: userProfile.username,
      email: userProfile.email,
      location: userProfile.location === null
        ? '' : userProfile.location,
      aboutMe: userProfile.aboutMe === null
        ? '' : userProfile.aboutMe,
      profileImage,
      initialImage: profileImage
    });
  }
  /**
   * @description handles on state change
   * @method handleChange
   *
   * @param { object } event - event object containing profile details
   *
   * @returns { object } new user profile state
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @description handles clicking of hidden input of type file
   * @method handleClick
   *
   * @returns {*} null
   */
  handleClick() {
    $('input[type=file]').click();
  }
  /**
   * @description handles on focus event
   * @method handleOnFocus
   * @param { object } event - event object containing profile details
   *
   * @returns { object } new user profile state
   */
  handleOnFocus(event) {
    this.setState({
      errors: Object.assign({}, this.state.errors, { [event.target.name]: '' })
    });
  }
  /**
   * @description handles on image change
   * @method handleImageChange
   *
   * @param { object } event - event object containing profile details
   *
   * @returns { object } profile image - new updated user image state
   */
  handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const filereader = new FileReader();
      checkImageFile(filereader, file, (fileType) => {
        if (fileType === 'image/png' || fileType === 'image/gif'
          || fileType === 'image/jpeg') {
          this.setState({ imageFile: file });
          filereader.onload = (e) => {
            this.setState({ profileImage: e.target.result });
          };
          filereader.readAsDataURL(file);
        } else {
          toastr.remove();
          toastr.error('please provide a valid image file');
        }
      });
    } else {
      this.setState({ profileImage: this.state.initialImage, imageFile: '' });
    }
  }
  /**
   * @description handles client validation checks
   * @method isValid
   *
   * @returns { bool } true/false when form is submitted
   */
  isValid() {
    const { errors, isValid } = validateInputs(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @description handles on submit event for updating user profile
   *
   * @param { object } event - event object containing user details
   *
   * @returns { * } null
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.updateProfile(this.state)
        .then(() => {
          if (this.props.updateProfileError === '') {
            console.log(this.props.updatedProfile.message);
            toastr.remove();
            toastr.success(this.props.updatedProfile.message);
          } else {
            toastr.remove();
            toastr.error(this.props.updateProfileError);
          }
        });
    }
  }
  /**
   * @description renders user profile form
   *
   * @returns { jsx } jsx - renders Profile
   */
  render() {
    const { isFetching } = this.props;
    return (
      <div className="bg-faded">
        <NavBar/>
        <div className="pt-5">
          <PageHeader/>
        </div>
        <div className="container main-wrapper pt-0 mt-4">
          {isFetching ?
            <div className="text-center">
              <Spinner size={50} className="text-center mt-5"/>
            </div>
            :
            <ProfileForm
              handleChange={this.handleChange}
              handleFocus={this.handleOnFocus}
              handleClick={this.handleClick}
              handleImageChange={this.handleImageChange}
              profile={this.state}
              handleSubmit={this.handleSubmit}
              isUpdating={this.props.isProfileUpdating}/>
          }
        </div>
        <Footer/>
      </div>
    );
  }
}

Profile.propTypes = {
  isFetching: PropTypes.bool,
  fetchProfile: PropTypes.func.isRequired,
  fetchedProfile: PropTypes.shape(),
  isProfileUpdating: PropTypes.bool.isRequired,
  updatedProfile: PropTypes.shape(),
  updateProfileError: PropTypes.string,
  updateProfile: PropTypes.func.isRequired
};
/**
 * @description maps redux state to props
 *
 * @param { object } state - holds user profile state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  isFetching: state.userProfile.isProfileFetching,
  fetchedProfile: state.userProfile.fetchedProfile.user,
  isProfileUpdating: state.userProfile.isProfileUpdating,
  updatedProfile: state.userProfile.updatedProfile,
  updateProfileError: state.userProfile.updateProfileError,
});
/**
 * @description maps action dispatch to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(fetchProfileRequest()),
  updateProfile: profileDetails =>
    dispatch(updateProfileRequest(profileDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
