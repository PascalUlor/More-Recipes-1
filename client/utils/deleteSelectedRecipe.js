/**
 * @description performs recipe deletion operation
 * @function
 *
 * @param   {function} deleteRecipe - performs recipe deletion operation
 * @param   {number} recipeId -  ID of recipe to be deleted
 *
 * @returns {*} null
 */
export const deleteSelectedRecipe = (deleteRecipe, recipeId) => (
  deleteRecipe(recipeId)
);

/**
 * @description performs recipe deletion operation
 * @function
 *
 * @param   {function} deleteRecipe - performs recipe deletion operation
 * @param   {number} recipeId -  ID of recipe to be deleted
 *
 * @returns {*} null
 */
export const fetchCurrentPageRecipes = (deleteSuccess, deleteError,
  fetchRecipes, isFetching, fetchedRecipes, currentPage, toastr) => {
  if (deleteSuccess !== '') {
    toastr.remove();
    toastr.success(deleteSuccess);
    if (typeof currentPage !== 'undefined') {
      fetchRecipes(currentPage)
        .then(() => {
          if (!isFetching) {
            if (fetchedRecipes.length === 0) {
              if (currentPage !== 1) {
                fetchRecipes(currentPage - 1);
              }
            }
          }
        });
    }
  } else if (deleteError !== '') {
    toastr.remove();
    toastr.error(deleteError);
  }
  $('div.modal-backdrop').removeClass('modal-backdrop fade show');
  $('button[id=close]').click();
};
