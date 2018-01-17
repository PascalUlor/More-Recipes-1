const requestFeedback = {
  success(response, statusCode, message, payload) {
    if (payload) {
      response.status(statusCode).json(Object.assign({
        status: 'Success',
        message
      }, payload));
    } else {
      response.status(statusCode).json({
        status: 'Success',
        message
      });
    }
  },
  error(response, statusCode, message) {
    response.status(statusCode).json({
      status: 'Failed',
      message
    });
  }
};

export default requestFeedback;
