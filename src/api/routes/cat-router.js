import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

// requests to /api/v1/cat
catRouter.route('/').get(getCat); //.post(postCat);

// requests to /api/v1/cat/:id
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

// use multer for post
const upload = multer({dest: 'uploads/'});
catRouter.post('/', upload.single('file'), postCat);

export default catRouter;
