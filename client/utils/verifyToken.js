import jwt from 'jsonwebtoken';


/**
 * @description verifies/authentication token
 * @function
 *
 * @returns { number } 1 or 0, representing valid or invalid token
 */
const verifyToken = () => {
  const token = window.localStorage.jwtToken;
  let verified;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error) => {
      if (error) {
        verified = 0;
      } else {
        verified = 1;
      }
    });
  } else {
    verified = 0;
  }
  return verified;
};

export default verifyToken;
