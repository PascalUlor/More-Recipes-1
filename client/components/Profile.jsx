import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Spinner from 'react-md-spinner';
import NavBar from './NavBar.jsx';
import ProfileForm from './profile/ProfileForm.jsx';
import Footer from './Footer.jsx';
import { fetchProfileRequest, updateProfileRequest } from '../actions/actionCreators/profileActions';
import checkImageFile from '../shared/validations/checkImageFile';
import validateInputs from '../shared/validations/profile';

class Profile extends Component {
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
  componentDidMount() {
    this.props.fetchProfile();
  }
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
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleClick() {
    $('input[type=file]').click();
  }
  handleOnFocus(event) {
    this.setState({
      errors: Object.assign({}, this.state.errors, { [event.target.name]: '' })
    });
  }
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
  isValid() {
    const { errors, isValid } = validateInputs(this.state);
    if (!isValid) {
        this.setState({ errors });
    }
    return isValid;
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.updateProfile(this.state)
      .then(() => {
        if (this.props.updateProfileError === '') {
          toastr.remove();
          toastr.success(this.props.updatedProfile.message);
        } else {
          toastr.remove();
          toastr.error(this.props.updateProfileError);
        }
      });
    }
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        <NavBar/>
        {isFetching ?
          <div className="text-center">
            <Spinner size={50} style={{ margin: '21.8% 50%' }}/>
          </div>
        :
          <div className="container-fluid main-wrapper">
            <div className="row">
              <div className="col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
                <ProfileForm
                  handleChange={this.handleChange}
                  handleFocus={this.handleOnFocus}
                  handleClick={this.handleClick}
                  handleImageChange={this.handleImageChange}
                  profile={this.state}
                  handleSubmit={this.handleSubmit}
                  isUpdating={this.props.isProfileUpdating}/>
              </div>
            </div>
          </div>
        }
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

const mapStateToProps = state => ({
  isFetching: state.userProfile.isProfileFetching,
  fetchedProfile: state.userProfile.fetchedProfile.user,
  isProfileUpdating: state.userProfile.isProfileUpdating,
  updatedProfile: state.userProfile.updatedProfile,
  updateProfileError: state.userProfile.updateProfileError,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => (dispatch(fetchProfileRequest())),
  updateProfile: profileDetails => (dispatch(updateProfileRequest(profileDetails)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);