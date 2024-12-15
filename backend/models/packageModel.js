const { pool } = require("../config/database");

// Fetch all tour packages
const getAllPackages = async () => {
  const query = "SELECT * FROM tour_packages ORDER BY created_at DESC";
  const result = await pool.query(query);
  return result.rows;
};

// Fetch a single package by ID
const getPackageById = async (id) => {
  const query = "SELECT * FROM tour_packages WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  getAllPackages,
  getPackageById
};
