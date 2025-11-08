import express from 'express';
import multer from 'multer';
import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsByUserId,
  getMyCats,
} from '../controllers/cat-controller.js';
import {createThumbnail} from '../../middlewares/thumbnail.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const catRouter = express.Router();

// use multer for post
const upload = multer({dest: 'uploads/'});

// requests to /api/v1/cats
catRouter
  .route('/')
  .get(getCats)
  .post(authenticateToken, upload.single('file'), createThumbnail, postCat);

// requests to /api/vi/user
catRouter.route('/user').get(authenticateToken, getMyCats); // own cats

// requests to /api/vi/user/:id
catRouter.route('/user/:id').get(authenticateToken, getCatsByUserId); // somebody elses cats

// requests to /api/v1/cats/:id
catRouter
  .route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default catRouter;
