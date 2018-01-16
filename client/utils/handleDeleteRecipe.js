export const handleRecipeDelete = (deleteRequest, recipeId) => (
  deleteRequest(recipeId)
);

export const fetchCurrentPageRecipes = (deleteSuccess, deleteError, fetchRecipesRequest, isRecipeFetching, fetchedRecipes, currentPage, toastr) => {
  if (deleteSuccess !== '') {
    toastr.remove();
    toastr.success(deleteSuccess);
    if (typeof currentPage !== 'undefined') {
      fetchRecipesRequest(currentPage)
        .then(() => {
          if (!isRecipeFetching) {
            if (fetchedRecipes.length === 0) {
              if (currentPage !== 1) {
                fetchRecipesRequest(currentPage - 1);
              }
            } else {
              fetchRecipesRequest(currentPage);
            }
          }
        });
    }
  } else if (deleteError !== '') {
    toastr.remove();
    toastr.error(deleteError);
  }
  $('button[id=close]').click();
};
