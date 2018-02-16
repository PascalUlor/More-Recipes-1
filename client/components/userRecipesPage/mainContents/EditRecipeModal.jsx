/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import toastr from 'toastr';
import validateInputs from '../../../shared/validations/createOrEditRecipe';
import checkImageFile from '../../../shared/validations/checkImageFile';


/**
 * @description HOC for rendering edit recipe modal component
 *
 * @class EditRecipeModal
 *
 * @extends Component
 */
class EditRecipeModal extends Component {
  /**
   * @description creates an instance of EditRecipeModal
   *
   * @constructor
   *
   * @param { props } props - contains modal component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      currentState: 0,
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
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  /**
   * @description receives lastest set props
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps - object of new incoming properties
   *
   * @returns {object} new state
   */
  componentWillReceiveProps(nextProps) {
    const {
      currentRecipeDetails, currentSetRecipeId
    } = nextProps;

    if (typeof currentRecipeDetails !== 'undefined' &&
      this.state.id !== currentSetRecipeId) {
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
  /**
   * @description handles on state change
   * @method handleChange
   *
   * @param { object } event - event object containing recipe details
   *
   * @returns { object } new recipe details state
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * @description handles on focus event
   * @method handleOnFocus
   *
   * @param { object } event - event object containing recipe details
   *
   * @returns { object } new recipe details state
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
   * @param { object } event - event object containing recipe details
   *
   * @returns { object } recipe image - new updated recipe image state
   */
  handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const filereader = new FileReader();
      checkImageFile(filereader, file, (fileType) => {
        if (fileType === 'image/png' || fileType === 'image/gif' ||
        fileType === 'image/jpeg') {
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
      this.setState({
        currentImageSrc: this.state.initialImageSrc, imageFile: ''
      });
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
   * @description handles on update event for updating user recipe
   *
   * @returns { * } null
   */
  handleUpdate() {
    this.props.updateRecipe(this.state)
      .then(() => {
        if (this.props.updateSuccess !== '') {
          toastr.remove();
          toastr.success(this.props.updateSuccess);
        } else if (this.props.updateError !== '') {
          toastr.remove();
          toastr.error(this.props.updateError);
        }
        $('button[id=close]').click();
      });
  }
  /**
   * @description handles on submit event for updating user recipe
   *
   * @param { object } event - event object containing user recipe details
   *
   * @returns { * } null
   */
  handleSubmit(event) {
    event.preventDefault();
    const { initialTitle, title } = this.state,
      { checkDoubleRecipeTitle } = this.props;
    if (this.isValid()) {
      this.setState({ errors: {} });
      if (initialTitle.trim() === title.trim()) {
        this.handleUpdate();
      } else {
        checkDoubleRecipeTitle(title)
          .then(() => {
            const { isTitleDouble, doubleTitleError } = this.props;
            if (isTitleDouble) {
              toastr.remove();
              toastr.warning(doubleTitleError);
            } else {
              this.handleUpdate();
            }
          });
      }
    }
  }
  /**
   * @description displays edit recipe modal form
   *
   * @returns { jsx } jsx - renders EditRecipeModal
   */
  render() {
    const {
        title, ingredients, procedures, currentImageSrc, errors
      } = this.state,
      { isRecipeUpdating } = this.props;
    return (
      <div className="modal fade" id="editRecipeModal" tabIndex="-1"
        role="dialog" aria-labelledby="editRecipe" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="navbar-brand text-gray-dark">
                <img src='/images/logo.png' width="45" height="32"
                  className="d-inline-block align-center"
                  alt=" More Recipe Logo"/>
                <span id="site-name">More Recipes</span>
              </span>
              <button type="button" id="close" className="close"
                data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <form role="form" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-7 col-lg-7">
                  <div className="modal-body">
                    <div className="form-row text-muted">
                      <div className="col p-1">
                        <input type="text" name="title" id="title"
                          onChange={this.onChange}
                          value={title} className="form-control"
                          onFocus={this.handleOnFocus}
                          placeholder="enter recipe title"/>
                      </div>
                      <div className="text-danger small text-left p-1">
                        {errors.title && <em>{errors.title}</em>}
                      </div>
                      <div className="col p-1">
                        <textarea rows="5" name="ingredients"
                          value={ingredients} onChange={this.onChange}
                          onFocus={this.handleOnFocus} className="form-control"
                          placeholder="enter recipe ingredients"
                          aria-describedby="help">
                        </textarea>
                      </div>
                      {errors.ingredients
                        ? <div className="text-danger small text-left p-1">
                          <em>{errors.ingredients}</em>
                        </div>
                        : <small id="help" name="ingredients"
                          className="form-text text-warning text-left p-1">
                          <i>separate each ingredient with a full stop (.)</i>
                        </small>
                      }
                      <div className="col p-1 mb-0">
                        <textarea rows="5" name="procedures" value={procedures}
                          onChange={this.onChange} onFocus={this.handleOnFocus}
                          className="form-control"
                          placeholder="enter procedures or steps taken">
                        </textarea>
                      </div>
                      {errors.procedures
                        ? <div className="text-danger small text-left p-1">
                          <em>{errors.procedures}</em>
                        </div>
                        : <small id="help" name="procedures"
                          className="form-text text-warning text-left p-1">
                          <i>separate each procedure with a full stop (.)</i>
                        </small>
                      }
                    </div>
                  </div>
                </div>
                <div
                  className=
                    "col-10 offset-1 col-sm-10 offset-1 col-md-4 col-lg-4 text-gray-dark mt-3">
                  <img src={currentImageSrc}
                    className="img-thumbnail img-fluid mb-3 recipe-image"
                    alt="recipe image"/>
                </div>
              </div>
              <div className="form-group text-gray-dark ml-3 p-1">
                <input type="file" name="imageFile" accept="image/*"
                  onChange={this.handleImageChange} id="imageSrc"
                  className="form-control-file" aria-describedby="fileHelp"/>
                {errors.image
                  ? <span className="text-danger small">{errors.image}</span>
                  : <small id="fileHelp"
                    className="form-text text-warning text-left">
                    <i>Maximum allowable image size is 3mb</i>
                  </small>
                }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                  data-dismiss="modal">Close</button>
                <button type="submit" id="edit-recipe" className="btn btn-info"
                  disabled={isRecipeUpdating}>
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
  isTitleDouble: PropTypes.bool.isRequired,
  checkDoubleRecipeTitle: PropTypes.func.isRequired,
  doubleTitleError: PropTypes.string.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  isRecipeUpdating: PropTypes.bool.isRequired,
  updateSuccess: PropTypes.string.isRequired,
  updateError: PropTypes.string.isRequired,
  currentSetRecipeId: PropTypes.number,
  currentRecipeDetails: PropTypes.object
};
/**
 * @description maps redux state to props
 *
 * @param { object } state - holds user recipe details state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  isTitleDouble: state.checkDoubleRecipeTitle.isRecipeTitleDouble,
  doubleTitleError: state.checkDoubleRecipeTitle.doubleRecipeTitleError,
  isRecipeUpdating: state.editUserRecipe.isRecipeUpdating,
  updateSuccess: state.editUserRecipe.updateRecipeSuccess,
  updateError: state.editUserRecipe.updateRecipeError,
  currentSetRecipeId: state.setCurrentRecipe.currentSetRecipeId,
  currentRecipeDetails: state.setCurrentRecipe.currentSetRecipe.recipe
});

export default connect(mapStateToProps)(EditRecipeModal);
