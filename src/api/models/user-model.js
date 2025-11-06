// mock data
const userItems = [
  {
    user_id: 36010,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3609,
    name: 'Mary Doe',
    username: 'marydoe',
    email: 'mary@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3608,
    name: 'Sue Doe',
    username: 'suedoe',
    email: 'sue@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return {user_id: newId};
};

const removeUser = (id) => {
  const user = findUserById(id);
  return user ? userItems.pop(user) : false;
};

const updateUser = (user) => {
  // check if user with id exists
  const oldUserData = findUserById(user.user_id);
  if (!oldUserData) {
    return null;
  }

  // keep old user data and update with new data
  const updatedUser = {
    ...oldUserData,
    ...user,
  };
  return updatedUser;
};

export {listAllUsers, findUserById, addUser, removeUser, updateUser};
