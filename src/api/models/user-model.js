// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const result = await promisePool.query('SELECT * FROM wsk_users');
  //console.log('result', result);
  const rows = result[0];

  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, password, role} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
  const result = await promisePool.execute(sql, params);
  //console.log('result', result);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return {user_id: result[0].insertId};
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);

  const [result] = await promisePool.execute(sql);
  if (result.changedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id) => {
  // get a connection object from the pool
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?;', [id]);
    const sql = connection.format('DELETE FROM wsk_users WHERE user_id = ?', [
      id,
    ]);

    const [result] = await connection.execute(sql);

    if (result.affectedRows === 0) {
      return {
        message: 'User not deleted',
      };
    }

    // if no errors, commit the transaction (save changes)
    await connection.commit();

    return {
      message: 'User deleted',
    };
  } catch (error) {
    // if error, rollback transaction (undo changes)
    await connection.rollback();
    console.error('error', error.message);
    return {
      message: error.message,
    };
  } finally {
    connection.release();
  }
};

const getUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  //console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {
  listAllUsers,
  findUserById,
  addUser,
  removeUser,
  modifyUser,
  getUserByUsername,
};
