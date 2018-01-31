import { SET_PAGINATION_DETAILS } from '../actionTypes/actionTypes';

/**
 * @description handles setting pagination details
 *
 * @param { object } response - api response object
 *
 * @returns { object } paginationInfo - returns details of paginated page
 */
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

/**
 * @description handles setting pagination details
 *
 * @param { object } details - contains object of pagination details
 *
 * @returns { object } pagination details - returns details of paginated page
 */
export const setPaginationDetails = details => ({
  type: SET_PAGINATION_DETAILS,
  details
});
