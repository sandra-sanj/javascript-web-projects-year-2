import {
  addUser,
  findUserById,
  listAllUsers,
  removeUser,
  modifyUser,
  getUserByUsername,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

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

  // check if username exists
  if (await getUserByUsername(req.body.username)) {
    return res
      .status(201)
      .json({message: 'Cannot add user, username already exists'});
  }

  // modify password to hash format before it is added to the database
  req.body.password = await bcrypt.hash(req.body.password, 10); //bcrypt.hashSync(req.body.password, 10);

  const userData = {
    ...req.body,
    filename: req.file?.filename,
  };

  const result = await addUser(userData);

  if (result) {
    res.status(201).json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  //console.log('data from client', req.body);

  const user = await findUserById(req.params.id);

  if (!user) {
    return res.status(401).json({message: 'User not found'});
  }

  // check if user id and user id from token match
  if (user.user_id !== res.locals.user.user_id) {
    return res.status(403).json({message: 'User cannot modify this user'});
  }

  // check if username in use by other user
  const existingUserByUsername = await getUserByUsername(user.username);
  console.log('existingUserByUsername', existingUserByUsername);
  console.log(existingUserByUsername?.user_id !== user.user_id);

  if (
    existingUserByUsername &&
    existingUserByUsername.user_id !== user.user_id
  ) {
    return res.status(403).json({message: 'Username already exists'});
  }

  const {user_id, ...userData} = req.body;
  const result = await modifyUser(userData, user_id);

  if (result) {
    res.status(201).json({message: 'User updated.', result});
  } else {
    res.status(404).json({message: 'No updates done'});
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
