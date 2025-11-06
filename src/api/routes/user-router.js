import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

// requests to /api/v1/user
userRouter.route('/').get(getUser).post(postUser);

// requests to /api/v1/user/:id
userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
