import bcrypt from 'bcryptjs';
import models from '../models';
import requestFeedback from '../utils/requestFeedback';
import generateTokenAndSendFeedback from '../utils/users';

const { Users, Reviews } = models;


/**
 * @class UsersApiController
 */
export default class UsersApiController {
  /**
   * @description Users details are captured and persisted on the database
   * @memberof UsersApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} failure message object or success message object with the persisted database data
   */
  static signup(request, response) {
    const { fullName, username, email } = request.body;

    return Users.findOne({
      where: {
        $or: [{
            username: {
              $iLike: username
            }
          },
          {
            email: {
              $iLike: email
            }
          }
        ]
      }
    }).then((foundUser) => {
      const errors = {};
      if (foundUser) {
        if (foundUser.username === username) {
          errors.username = 'Username already exist';
        }
        if (foundUser.email === email) {
          errors.email = 'Email already exist';
        }
        return response.status(409).json({
          status: 'Failed',
          errors
        });
      }
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(request.body.password, salt, (err, hash) => {
          Users.create({
            fullName,
            username,
            email,
            password: hash
          }).then(user => (generateTokenAndSendFeedback(request, response, 201, 'Successfully created account', user)));
        });
      });
    }).catch(error => requestFeedback.error(response, 500, error.message));
  }

  /**
   * @description User details are captured and authenticated against persisted database data
   * @memberof UsersApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} Failure message or Success message with persisted database data
   */
  static signin(request, response) {
    const { username, password } = request.body,
      errors = { form: 'Invalid username or password' };

    return Users.findOne({
      where: {
        username: {
          $iLike: username
        }
      }
    }).then((user) => {
      if (user && user.username.toLowerCase === username.toLowerCase) {
        const check = bcrypt.compareSync(password, user.password);
        if (check) {
          return generateTokenAndSendFeedback(request, response, 200, 'You are now logged In', user);
        }
        return response.status(401).json({
          status: 'Failed',
          errors
        });
      }
      return response.status(404).json({
        status: 'Failed',
        errors
      });
    }).catch(error => requestFeedback.error(response, 500, error.message));
  }

  /**
   * @description Get user details from persisted database data
   * @memberof UsersApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} Failure message or Success message with persisted database data
   */
  static getUser(request, response) {
    const { userId } = request.decoded;

    Users.findOne({
      where: { id: userId },
      attributes: [
        'id', 'fullName', 'username', 'email',
        'profileImage', 'location', 'aboutMe'
      ]
    }).then((user) => {
      if (user) {
        return requestFeedback.success(response, 200, 'User found', { user });
      }
      return requestFeedback.error(response, 404, 'User not found or has been deleted');
    });
  }

  /**
   * @description Update user details and persist updated data to database
   * @memberof UsersApiController
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   *
   * @returns {object} Failure message or Success message with persisted database data
   */
  static updateUser(request, response) {
    const {
      fullName,
      username,
      email,
      location,
      aboutMe,
      profileImage
    } = request.body, { userId } = request.decoded;

    Users.findOne({ where: { id: userId } }).then((foundUser) => {
      if (!foundUser) {
        return requestFeedback.error(response, 404, 'User not found or has been deleted');
      }
      return foundUser.updateAttributes({
        fullName: (fullName) || foundUser.fullName,
        username: (username) || foundUser.username,
        email: (email) || foundUser.email,
        location: (location) || foundUser.location,
        aboutMe: (aboutMe) || foundUser.aboutMe,
        profileImage: (profileImage) || foundUser.profileImage
      }).then(() => {
        Users.findOne({
          where: { id: userId },
          attributes: [
            'id', 'fullName', 'username', 'email',
            'profileImage', 'location', 'aboutMe'
          ]
        }).then((updatedUser) => {
          const feedback = requestFeedback.success(response, 200, 'User profile updated successfully', { updatedUser });
          Reviews.findOne({ where: { userId } }).then((review) => {
            if (review) {
              Reviews.update({
                  username: updatedUser.username,
                  profileImage: updatedUser.profileImage
                }, {
                  where: {
                    userId
                  }
                })
                .then(() => (feedback));
            }
            return feedback;
          });
        });
      }).catch(error => requestFeedback.error(response, 500, error.message));
    });
  }
}
