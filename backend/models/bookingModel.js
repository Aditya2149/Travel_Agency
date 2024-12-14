//bookingModel.js
const { pool } = require("../config/database");

// Fetch all bookings
const getAllBookings = async () => {
  const query = `
    SELECT 
      b.id AS booking_id,
      b.customer_name,
      b.email,
      b.number_of_travelers,
      b.total_price,
      t.title AS package_title,
      t.price AS price_per_person
    FROM bookings b
    JOIN tour_packages t ON b.package_id = t.id
    ORDER BY b.booking_date DESC`;
  const result = await pool.query(query);
  return result.rows;
};

// Create a new booking
const createBooking = async ({
  package_id,
  customer_name,
  email,
  phone,
  number_of_travelers,
  special_requests,
}) => {
  try {
    // Fetch the price of the selected package
    const packageQuery = 'SELECT price FROM tour_packages WHERE id = $1';
    const result = await pool.query(packageQuery, [package_id]);

    if (result.rows.length === 0) {
      throw new Error('Package not found');
    }

    const pricePerPerson = result.rows[0].price;

    // Calculate the total price
    const totalPrice = pricePerPerson * number_of_travelers;

    // Insert the new booking into the database
    const insertQuery = `
      INSERT INTO bookings (package_id, customer_name, email, phone, number_of_travelers, special_requests, total_price)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      package_id,
      customer_name,
      email,
      phone,
      number_of_travelers,
      special_requests,
      totalPrice,
    ];

    const insertResult = await pool.query(insertQuery, values);

    return insertResult.rows[0]; // Return the newly created booking
  } catch (error) {
    throw new Error(error.message); // Rethrow the error for the controller to handle
  }
};

module.exports = {
  getAllBookings,
  createBooking,
};
