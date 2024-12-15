//authcontroller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getAdminByUsername } = require('../models/adminModel');

// Admin Login Controller
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
console.log(req.body);
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Fetch admin by username from the database
    const admin = await getAdminByUsername(username);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const payload = { id: admin.id, username: admin.username };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }); // Use a secret key for the JWT

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


// Middleware to verify JWT token
const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Verify token using the secret key
    req.admin = decoded; // Add decoded data (admin info) to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  adminLogin, verifyAdmin
};
