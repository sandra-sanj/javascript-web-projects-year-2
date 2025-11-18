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
import {createThumbnail, upload} from '../../middlewares/upload.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getCats)
  .post(
    //authenticateToken,
    upload.single('file'), // file needs to be created first before validations
    body('cat_name').trim().isLength({min: 3, max: 20}).isAlpha().escape(),
    body('weight')
      .trim()
      .isNumeric()
      .toFloat()
      .custom(async (value) => {
        if (value > 30) {
          throw new Error('Weight is over 30');
        }
      }),
    body('owner').trim().isInt(),
    body('birthdate').trim().isDate(),
    //body('file').trim(),
    validationErrors,
    postCat
  );

// requests to /api/v1/cats
catRouter.route('/').get(getCats).post(upload.single('file'), postCat);

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
