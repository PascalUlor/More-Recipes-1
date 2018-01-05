const logOutRequest = () => {
  localStorage.removeItem('jwtToken');
  window.location.reload();
};

export default logOutRequest;
