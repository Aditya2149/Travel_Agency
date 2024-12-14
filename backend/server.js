// server.js
const express = require("express");
const { checkDatabaseConnection } = require("./config/database");

const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Check database connection
checkDatabaseConnection();

// Default route to confirm server is running
app.get("/", (req, res) => {
  res.send("Travel Agency Booking System Backend is Running!");
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});
