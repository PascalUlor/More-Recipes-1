import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();


/**
 * Ensures all routes are protected
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @returns {obj} Failure error message on denied request or User decoded data on granted request
 */
const authToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies token and checks if expired or invalid
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401);
                res.json({
                    status: 'Failed',
                    message: 'Authentication failed. Token is invalid or expired'
                });
            } else {
                // if everything is authentication is valid, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403);
        res.json({
            status: 'Failed',
            message: 'Access denied. You are not logged in'
        });
    }
};

export default authToken;