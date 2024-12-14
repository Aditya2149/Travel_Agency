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

// Create a new tour package
const createPackage = async (data) => {
  const { title, description, price, available_dates, image_url } = data;
  const query = `
    INSERT INTO tour_packages (title, description, price, available_dates, image_url)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const result = await pool.query(query, [
    title,
    description,
    price,
    available_dates,
    image_url,
  ]);
  return result.rows[0];
};

// Delete a package by ID
const deletePackageById = async (id) => {
  const query = "DELETE FROM tour_packages WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  deletePackageById,
};
