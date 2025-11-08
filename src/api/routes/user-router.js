import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const userRouter = express.Router();

// requests to /api/v1/user
userRouter.route('/').get(getUser).post(postUser);

// requests to /api/v1/user/:id
userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
