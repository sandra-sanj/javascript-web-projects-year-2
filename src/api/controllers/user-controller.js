import {
  addUser,
  findUserById,
  listAllUsers,
  removeUser,
  modifyUser,
  getUserByUsername,
} from '../models/user-model.js';
import {removeCat, listCatsByUserId} from '../models/cat-model.js';
import bcrypt from 'bcrypt';

const hashFormatPassword = async (password) => {
  return bcrypt.hash(password, 10); //bcrypt.hashSync(password, 10);
};

// check if user id and user id from token match
const getModifyingPermissions = async (user, logged_in_user_id) => {
  if (user.user_id !== logged_in_user_id) {
    return false;
  } else {
    return true;
  }
};

const verifyUserAccess = async (user, logged_in_user_id) => {
  // check user validity
  if (!user) {
    return {ok: false, status: 401, message: 'User not found'};
  }

  // check if token (logged in user) can modify user
  if (!(await getModifyingPermissions(user, logged_in_user_id))) {
    return {ok: false, status: 403, message: 'User cannot modify this user'};
  }

  return {ok: true};
};

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
  req.body.password = await hashFormatPassword(req.body.password);

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
  const user = await findUserById(req.params.id);

  // check user and token validity
  const valid = await verifyUserAccess(user, res.locals.user.user_id);
  if (!valid.ok) {
    return res.status(valid.status).json({message: valid.message});
  }

  // check if username in use by other user
  const existingUserByUsername = await getUserByUsername(user.username);
  if (
    existingUserByUsername &&
    existingUserByUsername.user_id !== user.user_id
  ) {
    return res.status(403).json({message: 'Username already exists'});
  }

  // modify password to hash format before it is added to the database
  req.body.password = await hashFormatPassword(req.body.password);

  const result = await modifyUser(req.body, user.user_id);

  if (result) {
    res.status(201).json({message: 'User updated.', result});
  } else {
    res.status(404).json({message: 'No updates done'});
  }
};

const deleteUser = async (req, res) => {
  const user = await findUserById(req.params.id);

  const valid = await verifyUserAccess(user, res.locals.user.user_id);
  if (!valid.ok) {
    return res.status(valid.status).json({message: valid.message});
  }

  // get user's cats and delete them
  const cats = await listCatsByUserId(res.locals.user.user_id);
  for (const cat of cats) {
    await removeCat(cat.cat_id);
  }

  const result = await removeUser(user.user_id);
  if (result) {
    res.status(200).json({message: 'User deleted.', result});
  } else {
    res.status(404).json({message: 'User not deleted'});
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
