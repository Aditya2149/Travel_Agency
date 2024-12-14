//bookingController.js
const { getAllBookings, createBooking } = require("../models/bookingModel");

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// Create a new booking
const addBooking = async (req, res) => {
  try {
    // Call the model function to create the booking
    const newBooking = await createBooking(req.body);

    // Return the newly created booking with the calculated total price
    res.status(201).json({
      booking_id: newBooking.id,
      package_id: newBooking.package_id,
      customer_name: newBooking.customer_name,
      email: newBooking.email,
      phone: newBooking.phone,
      number_of_travelers: newBooking.number_of_travelers,
      special_requests: newBooking.special_requests,
      total_price: newBooking.total_price,
      booking_date: newBooking.booking_date,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

module.exports = {
  getBookings,
  addBooking,
};
