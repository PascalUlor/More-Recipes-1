import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardNavBar from './dashboard/dashboardNavbar.jsx';
import ProfileForm from './profile/ProfileForm.jsx';
import Footer from './footer.jsx';
import { fetchProfile } from '../actions/actionCreators/profileActions';
import imageFileChecker from '../shared/validations/imageFileChecker';

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
            imageFile: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.fetchProfile();
        }, 2000);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.fetchedProfile !== undefined) {
            const profileImage = nextProps.fetchedProfile.profileImage === null ? '/images/nophoto.jpg' : nextProps.fetchedProfile.profileImage;
            this.setState({
                fullName: nextProps.fetchedProfile.fullName,
                username: nextProps.fetchedProfile.username,
                email: nextProps.fetchedProfile.email,
                location: nextProps.fetchedProfile.location === null ? '' : nextProps.fetchedProfile.location,
                aboutMe: nextProps.fetchedProfile.aboutMe === null ? '' : nextProps.fetchedProfile.aboutMe,
                profileImage,
                initialImage: profileImage
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const filereader = new FileReader();
            imageFileChecker(filereader, file, (fileType) => {
                if (fileType === 'image/png' || fileType === 'image/gif' || fileType === 'image/jpeg') {
                    this.setState({ imageFile: file });
                    filereader.onload = (e) => {
                        this.setState({ profileImage: e.target.result });
                    };
                    filereader.readAsDataURL(file);
                } else {
                    toastr.clear();
                    toastr.error('please provide a valid image file');
                 }
            });
        } else {
            this.setState({ profileImage: this.state.initialImage, imageFile: '' });
        }
    }

    render() {
        return (
            <div>
                <DashboardNavBar/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-10 col-md-8 col-lg-8 offset-sm-1 offset-md-2 offset-lg-2">
                            <ProfileForm handleChange={this.handleChange} handleImageChange={this.handleImageChange} profile={this.state}/>
                        </div>
                    </div>
                </div>
                <Footer id="homeFooter"/>
            </div>
        );
    }
}

Profile.propTypes = {
    fetchProfile: PropTypes.func.isRequired,
    isProfileFetching: PropTypes.bool,
    fetchedProfile: PropTypes.object
};

const mapStateToProps = state => ({
    isProfileFetching: state.userProfile.isProfileFetching,
    fetchedProfile: state.userProfile.fetchedProfile.user
});

export default connect(mapStateToProps, { fetchProfile })(Profile);