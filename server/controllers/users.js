import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

const { Users } = models;

env.config();

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
          }).then((user) => {
            const payload = { fullName: user.fullName, username: user.username, userId: user.id };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 8
            });
            request.token = token;
            return response.status(201).json({
              status: 'Success',
              message: 'Successfully created account',
              user: {
                id: user.id,
                username: user.username,
                email: user.email
              },
              token
            });
          });
        });
      });
    }).catch(error => response.status(500).json({
      status: 'Failed',
      message: error.message
    }));
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
          const payload = { fullName: user.fullName, username: user.username, userId: user.id };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 8
          });
          request.token = token;
          return response.status(200).json({
            status: 'Success',
            message: 'You are now logged In',
            user: {
              id: user.id,
              username: user.username
            },
            token
          });
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
    }).catch(error => response.status(500).json({
      status: 'Failed',
      message: error.message
    }));
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
        return response.status(200).json({
          status: 'Success',
          message: 'User found',
          user
        });
      }
      return response.status(404).json({
        status: 'Failed',
        message: 'User not found'
      });
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
        return response.status(404).json({
          status: 'Failed',
          message: 'User not found'
        });
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
        }).then(updatedUser => response.status(200).json({
          status: 'Success',
          message: 'User profile updated successfully',
          updatedUser
        }));
      }).catch(() => response.status(500).json({
        status: 'Failed',
        message: 'Server error. Unable to update profile'
      }));
    });
  }
}
