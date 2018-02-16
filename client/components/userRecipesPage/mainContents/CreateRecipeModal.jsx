/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import toastr from 'toastr';
import validateInputs from '../../../shared/validations/createOrEditRecipe';
import checkImageFile from '../../../shared/validations/checkImageFile';


/**
 * @description HOC for rendering create recipe modal component
 *
 * @class CreateRecipeModal
 *
 * @extends Component
 */
class CreateRecipeModal extends Component {
  /**
   * @description creates an instance of CreateRecipeModal
   *
   * @constructor
   *
   * @param { props } props - contains modal component properties
   */
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
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearState = this.handleClearState.bind(this);
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
  /**
   * @description handles on focus event
   * @method handleClearState
   *
   * @returns { object } new recipe details state
   */
  handleClearState() {
    this.setState({
      title: '',
      ingredients: '',
      procedures: '',
      imageFile: {},
      imageSrc: '/images/noimageyet.jpg',
      errors: {}
    });
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
   * @description handles on submit event for creating user recipe
   *
   * @param { object } event - event object containing user recipe details
   *
   * @returns { * } null
   */
  handleSubmit(event) {
    event.preventDefault();
    const {
      checkDoubleRecipeTitle, createRecipe
    } = this.props;
    if (this.isValid()) {
      this.setState({ errors: {} });
      checkDoubleRecipeTitle(this.state.title)
        .then(() => {
          const {
            isTitleDouble, doubleTitleError
          } = this.props;
          if (isTitleDouble) {
            toastr.remove();
            toastr.warning(doubleTitleError);
          } else {
            createRecipe(this.state)
              .then(() => {
                const { createSuccess, createError } = this.props;
                if (createError === '') {
                  toastr.remove();
                  toastr.success(createSuccess);
                } else {
                  toastr.remove();
                  toastr.error(createError);
                }
                $('button[id=close]').click();
                this.handleClearState();
              });
          }
        });
    }
  }
  /**
   * @description displays create recipe modal form
   *
   * @returns { jsx } jsx - renders CreateRecipeModal
   */
  render() {
    const {
        title, ingredients, procedures, imageSrc, errors
      } = this.state,
      { isRecipeCreating } = this.props;
    return (
      <div
        id="createRecipeModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createRecipe"
        aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="navbar-brand text-gray-dark">
                <img src="/images/logo.png" width="45" height="32"
                  className="d-inline-block align-center"
                  alt="More Recipes Logo"/>
                <span id="site-name">More Recipes</span>
              </span>
              <button type="button" onClick={this.handleClearState} id="close"
                className="close" data-dismiss="modal" aria-label="Close">
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
                        <input type="text" name="title" value={title}
                          onChange={this.onChange} onFocus={this.handleOnFocus}
                          className="form-control"
                          placeholder="enter recipe title"/>
                      </div>
                      <div className="text-danger small text-left p-1">
                        {errors.title &&
                          <em id="title-error">{errors.title}</em>}
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
                          <em id="ingredient-error">{errors.ingredients}</em>
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
                          <em id="procedure-error">{errors.procedures}</em>
                        </div>
                        : <small id="help" name="procedures"
                          className="form-text text-warning text-left p-1">
                          <i>separate each step taken with a full stop (.)</i>
                        </small>
                      }
                    </div>
                  </div>
                </div>
                <div className=
                  "col-10 offset-1 col-sm-10 offset-1 col-md-4 col-lg-4 text-gray-dark mt-3">
                  <img src={imageSrc} alt="recipe image"
                    className="img-thumbnail img-fluid mb-3 recipe-image"
                  />
                </div>
              </div>
              <div className="form-group text-gray-dark ml-3 p-1">
                <input type="file" name="imageFile" id="imageSrc"
                  onChange={this.handleImageChange} accept="image/*"
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
                <button type="button" onClick={this.handleClearState}
                  className="btn btn-secondary"
                  data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-info"
                  disabled={isRecipeCreating}>
                  {!isRecipeCreating
                    ? 'Save Recipe'
                    : <span>Saving...
                      <Spinner size={20}/></span>}
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
  checkDoubleRecipeTitle: PropTypes.func.isRequired,
  isTitleDouble: PropTypes.bool.isRequired,
  createRecipe: PropTypes.func.isRequired,
  doubleTitleError: PropTypes.string.isRequired,
  isRecipeCreating: PropTypes.bool.isRequired,
  createSuccess: PropTypes.string.isRequired,
  createError: PropTypes.string.isRequired
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
  isRecipeCreating: state.createRecipe.isRecipeCreating,
  createSuccess: state.createRecipe.createRecipeSuccess,
  createError: state.createRecipe.createRecipeError
});

export default connect(mapStateToProps)(CreateRecipeModal);
