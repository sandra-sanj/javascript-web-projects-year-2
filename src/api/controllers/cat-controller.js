import {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  listCatsByUserId,
} from '../models/cat-model.js';

const getCats = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res, next) => {
  //console.log(res.locals.user.user_id);

  // check if file is rejected by multer
  if (!req.file) {
    const error = new Error('Invalid or missing file!');
    error.status = 400;
    next(error);
  }

  const catData = {
    ...req.body,
    filename: req.file?.filename,
  };
  if (res.locals.user) {
    catData.owner =res.locals.user.user_id;
  }

  const result = await addCat(catData);

  if (result?.cat_id) {
    res.status(201);
    res.json({message: 'New cat added', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    return res.status(401).json({message: 'Cat not found'});
  }

  // check if cat owner and user match or if user is admin
  if (
    cat.owner !== res.locals.user.user_id &&
    res.locals.user.role !== 'admin'
  ) {
    return res.status(403).json({message: 'User cannot modify this cat'});
  }

  // modify user cat
  const result = await modifyCat(req.body, cat.cat_id);
  if (result) {
    res.status(201).json({message: 'Cat updated', result});
  } else {
    res.status(404).json({message: `No updates done}`});
  }
};

const deleteCat = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    return res.status(401).json({message: 'Cat not found'});
  }

  // check if cat owner and user match
  if (
    cat.owner !== res.locals.user.user_id &&
    res.locals.user.role !== 'admin'
  ) {
    return res.status(403).json({message: 'User cannot delete this cat'});
  }

  const result = await removeCat(req.params.id);
  if (result) {
    res.status(200).json({message: 'Cat deleted', result});
  } else {
    res.status(404).json({message: 'Cat not deleted'});
  }
};

const getCatsByUserId = async (req, res) => {
  const cats = await listCatsByUserId(req.params.id);
  res.json(cats);
};

const getMyCats = async (req, res) => {
  const cats = await listCatsByUserId(res.locals.user.user_id);
  res.json(cats);
};

// test if user is admin or is owner of cat
//const isCatOwnerOrAdmin = async (req, res) => {};

export {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsByUserId,
  getMyCats,
};
