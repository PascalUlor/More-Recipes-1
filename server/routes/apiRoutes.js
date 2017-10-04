import express from 'express';
import UserValidation from '../middleware/validations/users';
import UserController from '../controllers/users';

const router = express.Router();

// POST route for users signup
router.route('/users/signup')
    .post(UserValidation.signup, UserController.signup);

// POST route for users signin
router.route('/users/signin')
    .post(UserValidation.signup, UserController.signup);

export default router;