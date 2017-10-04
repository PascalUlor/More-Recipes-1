import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users } from '../models';

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
        return Users.sync({ force: false }).then(() => {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    Users.create({
                        fullName: req.body.fullname,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    }).then((user) => {
                        res.status(200);
                        res.json({
                            status: 'Success',
                            message: 'Successfully create a new account',
                            data: {
                                id: user.id,
                                username: user.username,
                                email: user.email
                            }
                        });
                    }).catch((err) => {
                        if (err) {
                            res.status(400);
                            res.json({
                                status: 'Failed',
                                message: 'Username already exits'
                            });
                        }
                    });
                });
            });
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
        Users.findOne({ where: { username: req.body.username } }).then((user) => {
            if (user && user.username === req.body.username) {
                const check = bcrypt.compareSync(req.body.password, user.password);
                if (check) {
                    const payload = { username: user.username, userId: user.id };
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 60 * 60
                    });
                    req.token = token;
                    res.status(200);
                    res.json({
                        status: 'Success',
                        message: 'You are now logged In',
                        data: { id: user.id, username: user.username },
                        token
                    });
                } else {
                    res.status(400);
                    res.json({
                        status: 'Failed',
                        message: 'Invalid Password'
                    });
                }
            } else {
                res.status(404);
                res.json({
                    status: 'Failed',
                    message: 'User not found'
                });
            }
        });
    }
}