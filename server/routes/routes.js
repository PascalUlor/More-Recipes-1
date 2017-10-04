import express from 'express';
import UserValidation from '../middleware/validations/users';
import UserController from '../controllers/users';

const router = express.Router();

// Route for user signup
router.route('/user/signup')
    .post(UserValidation.signup, UserController.signup);

// Route for user signin
router.route('/user/signin')
    .post(UserValidation.signup, UserController.signup);

export default router;