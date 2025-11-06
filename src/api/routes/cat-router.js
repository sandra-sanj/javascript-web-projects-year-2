import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

// requests to /api/v1/cat
catRouter.route('/').get(getCat).post(postCat);

// requests to /api/v1/cat/:id
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
