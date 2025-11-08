// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const result = await promisePool.query('SELECT * FROM wsk_cats');
  //console.log('result', result);
  const rows = result[0];

  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const result = await promisePool.execute(sql, params);
  console.log('result', result);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: result[0].insertId};
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [
    cat,
    id,
  ]);

  const [result] = await promisePool.execute(sql);
  if (result.changedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const listCatsByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [userId]
  );
  return rows;
};

export {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  listCatsByUserId,
};
