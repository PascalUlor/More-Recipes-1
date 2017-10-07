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
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} Failure message or Success message with the persisted database data
     * @memberof UsersApiController
     */
    static signup(req, res) {
        Users.findOne({
                where: {
                    $or: [{
                            username: {
                                $iLike: req.body.username
                            }
                        },
                        {
                            email: {
                                $iLike: req.body.email
                            }
                        }
                    ]
                }
            }).then((foundUser) => {
                let errorField;
                if (foundUser) {
                    if (foundUser.username === req.body.username) {
                        errorField = 'Username';
                    } else {
                        errorField = 'Email';
                    }
                    res.status(400)
                        .json({
                            status: 'Failed',
                            message: `${errorField} already exist`
                        });
                } else {
                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            Users.create({
                                fullName: req.body.fullName,
                                username: req.body.username,
                                email: req.body.email,
                                password: hash
                            }).then((user) => {
                                res.status(201)
                                    .json({
                                        status: 'Success',
                                        message: 'Successfully created account',
                                        data: {
                                            id: user.id,
                                            username: user.username,
                                            email: user.email
                                        }
                                    });
                            });
                        });
                    });
                }
            })
            .catch((err) => {
                if (err) {
                    res.status(500)
                        .json({
                            status: 'Failed',
                            message: 'Server error occurred'
                        });
                }
            });
    }

    /**
     * User details are captured and authenticated against persisted database data
     * @static
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} Failure message or Success message with persisted database data
     * @memberof UsersApiController
     */
    static signin(req, res) {
        Users.findOne({
            where: {
                username: {
                    $iLike: req.body.username
                }
            }
        }).then((user) => {
            if (user && user.username.toLowerCase === req.body.username.toLowerCase) {
                const check = bcrypt.compareSync(req.body.password, user.password);
                if (check) {
                    const payload = { fullName: user.fullName, username: user.username, userId: user.id };
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 60 * 60 * 8
                    });
                    req.token = token;
                    res.status(200)
                        .json({
                            status: 'Success',
                            message: 'You are now logged In',
                            data: {
                                id: user.id,
                                username: user.username
                            },
                            token
                        });
                } else {
                    res.status(400)
                        .json({
                            status: 'Failed',
                            message: 'Invalid username or password'
                        });
                }
            } else {
                res.status(404)
                    .json({
                        status: 'Failed',
                        message: 'User not found'
                    });
            }
        });
    }
}