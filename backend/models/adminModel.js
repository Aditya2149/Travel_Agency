//adminModel.js
const { pool } = require("../config/database");

// Fetch admin by username
const getAdminByUsername = async (username) => {
  const query = 'SELECT * FROM admins WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows[0]; // Return the admin if found
};

module.exports = {
  getAdminByUsername,
};
