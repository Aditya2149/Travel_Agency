// server.js
const express = require("express");
const { checkDatabaseConnection } = require("./config/database");
const packageRoutes = require("./routes/packageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors({ origin: '*' })); // Allow all origins

app.get('/api/packages', (req, res) => {
    res.json({ message: 'Packages fetched successfully' });
});

// Middleware for parsing JSON requests
app.use(express.json());

// Check database connection
checkDatabaseConnection();

// Routes
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/admin', adminRoutes); 

// Default route to confirm server is running
app.get("/", (req, res) => {
  res.send("Travel Agency Booking System Backend is Running!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));