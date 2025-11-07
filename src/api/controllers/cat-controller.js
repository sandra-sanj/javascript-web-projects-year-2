import {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
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

const postCat = async (req, res) => {
  // log data to console
  console.log('data from client', req.body);
  console.log('data from file', req.file);

  const catData = {
    ...req.body,
    filename: req.file?.filename,
  };

  const result = await addCat(catData);

  if (result?.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  console.log('data from client', req.body);

  const {cat_id, ...catData} = req.body;
  const result = await modifyCat(catData, cat_id);

  if (result) {
    res.status(201).json({message: 'Cat updated.', result});
  } else {
    res.status(404).json({message: `No updates done.}`});
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);

  if (result) {
    res.status(200).json({message: 'Cat deleted.', result});
  } else {
    res
      .status(404)
      .json({message: `No cat with id ${req.params.id}. Cannot delete.}`});
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};
