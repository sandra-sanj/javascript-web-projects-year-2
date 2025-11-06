import {
  addCat,
  findCatById,
  listAllCats,
  removeCat,
  updateCat,
} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body);

  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  const result = updateCat(req.body);

  if (result?.cat_id) {
    res.status(201).json({message: 'Cat updated.', result});
  } else {
    res
      .status(404)
      .json({message: `No cat with id ${req.params.id}. Cannot update.}`});
  }
};

const deleteCat = (req, res) => {
  const result = removeCat(req.params.id);

  if (result?.cat_id) {
    res.status(200).json({message: 'Cat deleted.', result});
  } else {
    res
      .status(404)
      .json({message: `No cat with id ${req.params.id}. Cannot delete.}`});
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};
