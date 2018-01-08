import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();


/**
 * @description CHecks whether or not a token exits
 * @function
 *
 * @param   {object} request   the server/http(s) request object
 * @param   {object} response  the server/http(s) response object
 * @param   {object} next      the node/express middleware next object
 *
 * @returns {object} failure error message object on denied requestuest or user decoded data object on granted requestuest
 */
const checkToken = (request, response, next) => {
  const token = request.body.token || request.query.token || request.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies token and checks if expired or invalid
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        next();
      } else {
        // if token authentication is valid, save to request
        request.decoded = decoded;
        next();
      }
    });
  } else {
    next();
  }
};

export default checkToken;
