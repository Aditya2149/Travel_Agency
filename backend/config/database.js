// database.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // For self-signed certificates
    ca: process.env.DB_SSL_CA, // Optional: Provide CA certificate for secure connections
  },
  sslmode: 'require' 
});


const checkDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the Aiven PostgreSQL database successfully!");
    client.release();
  } catch (error) {
    console.error("Failed to connect to the Aiven PostgreSQL database:", error.message);
    process.exit(1); // Exit the process if database connection fails
  }
};

module.exports = { pool, checkDatabaseConnection };
