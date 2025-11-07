import {
  addUser,
  findUserById,
  listAllUsers,
  removeUser,
  modifyUser,
} from '../models/user-model.js';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  // log data to console
  console.log('data from client', req.body);
  console.log('data from file', req.file);

  const userData = {
    ...req.body,
    filename: req.file?.filename,
  };

  const result = await addUser(userData);

  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  console.log('data from client', req.body);

  const {user_id, ...userData} = req.body;
  const result = await modifyUser(userData, user_id);

  if (result) {
    res.status(201).json({message: 'User updated.', result});
  } else {
    res
      .status(404)
      .json({message: `No user with id ${req.params.id}. Cannot update.}`});
  }
};

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);

  if (result) {
    res.status(200).json({message: 'User deleted.', result});
  } else {
    res
      .status(404)
      .json({message: `No user with id ${req.params.id}. Cannot delete.}`});
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
