import express from 'express';
import {postLogin, getMe} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const authRouter = express.Router();

// requests to /api/v1/auth/login
authRouter.route('/login').post(postLogin);

// requests to /api/v1/auth/me
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
