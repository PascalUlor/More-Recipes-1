import { SET_PAGINATION_DETAILS } from '../actionTypes/actionTypes';

export const paginationDetails = (response) => {
  const {
    numberOfRecipes,
    limit,
    totalPages,
    currentPage
  } = response.data,
    paginationInfo = {
      numberOfRecipes,
      limit,
      totalPages,
      currentPage
    };
  return paginationInfo;
};

export const setPaginationDetails = details => ({
  type: SET_PAGINATION_DETAILS,
  details
});
