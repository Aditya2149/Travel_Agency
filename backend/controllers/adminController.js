//adminController.js
const { pool } = require('../config/database');

// Add a new package
const addPackage = async (req, res) => {
  const { title, description, price, available_dates, image_url } = req.body;
  try {
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
    //   return result.rows[0];
    res.status(201).json(result.rows[0]); // Return the newly created package
  } catch (error) {
    res.status(500).json({ message: 'Error adding package', error: error.message });
  }
};

// Update an existing package
const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, available_dates, image_url } = req.body;

  try {
    const query = 'UPDATE tour_packages SET title = $1, description = $2, price = $3, available_dates = $4, image_url = $5 WHERE id = $6 RETURNING *';
    const values = [title, description, price,available_dates, image_url, id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(result.rows[0]); // Return the updated package
  } catch (error) {
    res.status(500).json({ message: 'Error updating package', error: error.message });
  }
};

// Delete a package
const deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM tour_packages WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json({message: 'Package deleted successfully'}); // Return 204 No Content on successful deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error: error.message });
  }
};

module.exports = {
  addPackage,
  updatePackage,
  deletePackage,
};
