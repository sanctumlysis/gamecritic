const db = require('../../../db/connection');

const fetchAllUsers = async () => {
  try {
    const res = await db.query('SELECT username FROM users;');
    return res.rows;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = fetchAllUsers;
