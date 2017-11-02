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
     * Users details are captured and persisted on the database
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure message or Success message with the persisted database data
     * @memberof UsersApiController
     */
    static signup(req, res) {
        const { fullName, username, email } = req.body;

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
                return res.status(400).json({
                    status: 'Failed',
                    errors
                });
            }
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    Users.create({
                        fullName,
                        username,
                        email,
                        password: hash
                    }).then(user => res.status(201).json({
                        status: 'Success',
                        message: 'Successfully created account',
                        data: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    }));
                });
            });
        }).catch(error => res.status(500).json({
            status: 'Failed',
            message: error.message
        }));
    }

    /**
     * User details are captured and authenticated against persisted database data
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure message or Success message with persisted database data
     * @memberof UsersApiController
     */
    static signin(req, res) {
        const { username, password } = req.body,
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
                    req.token = token;
                    return res.status(200).json({
                        status: 'Success',
                        message: 'You are now logged In',
                        data: {
                            id: user.id,
                            username: user.username
                        },
                        token
                    });
                }
                return res.status(400).json({
                    status: 'Failed',
                    errors
                });
            }
            return res.status(400).json({
                status: 'Failed',
                errors
            });
        }).catch(error => res.status(500).json({
            status: 'Failed',
            message: error.message
        }));
    }
}