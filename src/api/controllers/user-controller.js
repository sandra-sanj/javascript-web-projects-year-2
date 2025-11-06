import {
  addUser,
  findUserById,
  listAllUsers,
  removeUser,
  updateUser,
} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);

  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  const result = updateUser(req.body);

  if (result?.user_id) {
    res.status(201).json({message: 'User updated.', result});
  } else {
    res
      .status(404)
      .json({message: `No user with id ${req.params.id}. Cannot update.}`});
  }
};

const deleteUser = (req, res) => {
  const result = removeUser(req.params.id);

  if (result?.user_id) {
    res.status(200).json({message: 'User deleted.', result});
  } else {
    res
      .status(404)
      .json({message: `No user with id ${req.params.id}. Cannot delete.}`});
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
