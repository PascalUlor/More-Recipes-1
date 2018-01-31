/**
 * @description handles user logout user request
 *
 * @returns { undefined }
 */
const logOutRequest = () => {
  localStorage.removeItem('jwtToken');
  window.location.reload();
};

export default logOutRequest;
