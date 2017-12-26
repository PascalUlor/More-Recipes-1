import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import validateInputs from '../../../shared/validations/createOrEditRecipe';
import imageFileChecker from '../../../shared/validations/imageFileChecker';


class CreateRecipeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            ingredients: '',
            procedures: '',
            imageFile: {},
            imageSrc: '/images/noimageyet.jpg',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const filereader = new FileReader();
            imageFileChecker(filereader, file, (fileType) => {
                if (fileType === 'image/png' || fileType === 'image/gif' || fileType === 'image/jpeg') {
                    this.setState({ imageFile: file });
                    filereader.onload = (e) => {
                        this.setState({ imageSrc: e.target.result });
                    };
                    filereader.readAsDataURL(file);
                } else {
                    toastr.clear();
                    toastr.error('please provide a valid image file');
                 }
            });
        } else {
            this.setState({ imageSrc: '/images/noimageyet.jpg', imageFile: '' });
        }
    }
    handleClick() {
        this.setState({
            title: '', ingredients: '', procedures: '', imageFile: {}, imageSrc: '/images/noimageyet.jpg', errors: {}
        });
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
			this.props.doubleRecipeTitleCheck(this.state.title)
			.then(() => {
				if (this.props.isRecipeTitleDouble) {
					toastr.clear();
					toastr.warning(this.props.doubleRecipeTitleError);
				} else {
					this.props.createRecipeRequest(this.state, () => {
						if (this.props.createRecipeError === '') {
                            toastr.clear();
							toastr.success(this.props.createdRecipe.message);
						} else {
                            toastr.clear();
							toastr.error(this.props.createRecipeError);
                        }
                        $('button[id=close]').click();
					});
				}
			});
        }
    }

    render() {
      const {
          title,
          ingredients,
          procedures,
          imageSrc,
          errors
		} = this.state,
		{ isRecipeCreating } = this.props;
        return (
            <div className="modal fade" id="createRecipeModal" tabIndex="-1" role="dialog" aria-labelledby="createRecipe" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="navbar-brand text-gray-dark">
                                <img src="/images/logo.png" width="45" height="32" className="d-inline-block align-center" alt=" More Recipe Logo"/>
                                <span id="site-name">More Recipes</span>
                            </span>
                            <button type="button" onClick={this.handleClick} id="close" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="fa fa-times-circle" aria-hidden="true"></i></span>
                            </button>
                        </div>
                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-7">
                                    <div className="modal-body">
                                        <div className="form-row text-muted">
                                            <div className="col p-1">
                                                <input type="text" name="title" onChange={this.onChange} value={title} className="form-control" placeholder="enter recipe title"/>
                                            </div>
                                            <div className="text-danger small text-left p-1">
                                                {errors.title && <em>{errors.title}</em>}
                                            </div>
                                            <h6 className="text-info p-2">Ingredients</h6>
                                            <div className="col p-1">
                                                <textarea rows="5" name="ingredients" onChange={this.onChange} value={ingredients} className="form-control" placeholder="enter recipe ingredients" aria-describedby="help"></textarea>
                                            </div>
                                            {errors.ingredients ? <div className="text-danger small text-left p-1"><em>{errors.ingredients}</em></div> :
                                            <small id="help" name="procedures" className="form-text text-warning text-left p-1"><i>Separate each ingredient with a comma</i></small>}
                                            <h6 className="text-center text-info p-2">Procedures</h6>
                                            <div className="col p-1 mb-0">
                                                <textarea rows="5" name="procedures" onChange={this.onChange} value={procedures} className="form-control" placeholder="enter procedures or steps taken">
                                                </textarea>
                                            </div>
                                            {errors.procedures && <div className="text-danger small text-left p-1"><em>{errors.procedures}</em></div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-4 text-gray-dark mt-3">
                                    <img src={imageSrc} className="img-thumbnail img-fluid mb-3" style={{ width: '250px', height: '250px' }} alt="recipe image"/>
                                </div>
                            </div>
                            <div className="form-group text-gray-dark ml-3 p-1" >
                                <input type="file" name="imageFile" onChange={this.onImageChange} accept="image/*" className="form-control-file" id="imageSrc" aria-describedby="fileHelp"/>
                                {errors.image ? <span className="text-danger small">{errors.image}</span> : <small id="fileHelp" className="form-text text-warning text-left"><i>Maximum allowable image size is 3mb</i></small>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={this.handleClick} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-info" disabled={isRecipeCreating}>
								{ !isRecipeCreating ? 'Save Recipe' : <span>Saving... <Spinner size={20} /></span> }
								</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

CreateRecipeModal.propTypes = {
	doubleRecipeTitleCheck: PropTypes.func.isRequired,
	createRecipeRequest: PropTypes.func.isRequired,
	isRecipeTitleDouble: PropTypes.bool.isRequired,
	doubleRecipeTitleError: PropTypes.string.isRequired,
	isRecipeCreating: PropTypes.bool.isRequired,
	createdRecipe: PropTypes.object.isRequired,
	createRecipeError: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
		isRecipeTitleDouble: state.createRecipe.isRecipeTitleDouble,
        doubleRecipeTitleError: state.createRecipe.doubleRecipeTitleError,
		isRecipeCreating: state.createRecipe.isRecipeCreating,
		createdRecipe: state.createRecipe.createdRecipe,
		createRecipeError: state.createRecipe.createRecipeError
    };
}

export default connect(mapStateToProps)(CreateRecipeModal);