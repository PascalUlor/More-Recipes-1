import jwt from 'jsonwebtoken';
import env from 'dotenv';
import requestFeedback from './requestFeedback';

env.config();

const generateTokenAndSendFeedback = (request, response, statusCode, message, user) => {
  const payload = { username: user.username, userId: user.id };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 8
  });
  request.token = token;
  const feedback = {
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
    token
  };
  requestFeedback.success(response, statusCode, message, feedback);
};

export default generateTokenAndSendFeedback;
