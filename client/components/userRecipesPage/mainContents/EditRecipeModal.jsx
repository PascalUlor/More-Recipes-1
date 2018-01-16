import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import toastr from 'toastr';
import validateInputs from '../../../shared/validations/createOrEditRecipe';
import imageFileChecker from '../../../shared/validations/imageFileChecker';
import updateRecipeRequest from '../../../actions/actionCreators/editRecipeActions';


class EditRecipeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTitle: '',
      title: '',
      ingredients: '',
      procedures: '',
      imageFile: {},
      currentImageSrc: '',
      initialImageSrc: '',
      id: 0,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { currentRecipeDetails, currentSetRecipeId } = nextProps;
    if (typeof currentRecipeDetails !== 'undefined' && currentRecipeDetails.id === currentSetRecipeId) {
      this.setState({
        initialTitle: currentRecipeDetails.title,
        title: currentRecipeDetails.title,
        ingredients: currentRecipeDetails.ingredients,
        procedures: currentRecipeDetails.procedures,
        currentImageSrc: currentRecipeDetails.recipeImage,
        initialImageSrc: currentRecipeDetails.recipeImage,
        id: currentRecipeDetails.id
      });
    }
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
            this.setState({ currentImageSrc: e.target.result });
          };
          filereader.readAsDataURL(file);
        } else {
          toastr.remove();
          toastr.error('please provide a valid image file');
        }
      });
    } else {
      this.setState({ currentImageSrc: this.state.initialImageSrc, imageFile: '' });
    }
  }
  isValid() {
    const { errors, isValid } = validateInputs(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  handleUpdate() {
    this.props.updateRecipeRequest(this.state)
    .then(() => {
      if (this.props.updateRecipeSuccess !== '') {
        toastr.remove();
        toastr.remove(this.props.updateRecipeSuccess);
      } else if (this.props.updateRecipeError !== '') {
        toastr.clear();
        toastr.error(this.props.updateRecipeError);
      }
      $('button[id=close]').click();
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      if (this.state.initialTitle.trim() === this.state.title.trim()) {
        this.handleUpdate();
      } else {
        this.props.doubleRecipeTitleCheck(this.state.title)
        .then(() => {
          if (this.props.isRecipeTitleDouble) {
            toastr.remove();
            toastr.warning(this.props.doubleRecipeTitleError);
          } else {
            this.handleUpdate();
          }
        });
      }
    }
  }
  render() {
    const {
      title, ingredients, procedures, currentImageSrc, errors
    } = this.state,
    { isRecipeUpdating } = this.props;
    return (
      <div className="modal fade" id="editRecipeModal" tabIndex="-1" role="dialog"
        aria-labelledby="editRecipe" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="navbar-brand text-gray-dark">
                <img src='/images/logo.png' width="45" height="32"
                  className="d-inline-block align-center" alt=" More Recipe Logo"/>
                <span id="site-name">More Recipes</span>
              </span>
              <button type="button" id="close" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <form role="form" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-7">
                  <div className="modal-body">
                    <div className="form-row text-muted">
                      <div className="col p-1">
                        <input type="text" name="title" onChange={this.onChange} value={title}
                          className="form-control" placeholder="enter recipe title"/>
                      </div>
                      <div className="text-danger small text-left p-1">
                        {errors.title && <em>{errors.title}</em>}
                      </div>
                      <h6 className="text-info p-2">Ingredients</h6>
                      <div className="col p-1">
                        <textarea rows="5" name="ingredients" onChange={this.onChange} value={ingredients}
                          className="form-control" placeholder="enter recipe ingredients" aria-describedby="help">
                        </textarea>
                      </div>
                      {errors.ingredients
                        ? <div className="text-danger small text-left p-1">
                            <em>{errors.ingredients}</em>
                          </div>
                        : <small id="help" name="procedures" className="form-text text-warning text-left p-1">
                           <i>Separate each ingredient with a comma</i>
                          </small>
                      }
                      <h6 className="text-center text-info p-2">Procedures</h6>
                      <div className="col p-1 mb-0">
                        <textarea rows="5" name="procedures" onChange={this.onChange} value={procedures}
                          className="form-control" placeholder="enter procedures or steps taken">
                        </textarea>
                      </div>
                      {errors.procedures && <div className="text-danger small text-left p-1">
                        <em>{errors.procedures}</em>
                      </div>}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4 text-gray-dark mt-3">
                  <img src={currentImageSrc} className="img-thumbnail img-fluid mb-3"
                    style={{ width: '250px', height: '250px' }} alt="recipe image"/>
                </div>
              </div>
              <div className="form-group text-gray-dark ml-3 p-1">
                <input type="file" name="imageFile" onChange={this.onImageChange} accept="image/*"
                  className="form-control-file" id="imageSrc" aria-describedby="fileHelp"/>
                  {errors.image
                  ? <span className="text-danger small">{errors.image}</span>
                  : <small id="fileHelp" className="form-text text-warning text-left">
                      <i>Maximum allowable image size is 3mb</i>
                    </small>
                  }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-info" disabled={isRecipeUpdating}>
                  {!isRecipeUpdating
                    ? 'Update Recipe'
                    : <span>Updating...
                        <Spinner size={20}/>
                      </span>
                    }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditRecipeModal.propTypes = {
  isRecipeTitleDouble: PropTypes.bool.isRequired,
  doubleRecipeTitleCheck: PropTypes.func.isRequired,
  doubleRecipeTitleError: PropTypes.string.isRequired,
  updateRecipeRequest: PropTypes.func.isRequired,
  isRecipeUpdating: PropTypes.bool.isRequired,
  updateRecipeSuccess: PropTypes.string.isRequired,
  updateRecipeError: PropTypes.string.isRequired,
  currentSetRecipeId: PropTypes.number,
  currentRecipeDetails: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isRecipeTitleDouble: state.createRecipe.isRecipeTitleDouble,
    doubleRecipeTitleError: state.createRecipe.doubleRecipeTitleError,
    isRecipeUpdating: state.editUserRecipe.isRecipeUpdating,
    updateRecipeSuccess: state.editUserRecipe.updateRecipeSuccess,
    updateRecipeError: state.editUserRecipe.updateRecipeError,
    currentSetRecipeId: state.setCurrentRecipe.currentSetRecipeId,
    currentRecipeDetails: state.setCurrentRecipe.currentSetRecipe.recipe
  };
}

export default connect(mapStateToProps, { updateRecipeRequest })(EditRecipeModal);