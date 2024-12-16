// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://travel-agency-cll7.onrender.com/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        // Redirect to Admin Dashboard on successful login
        navigate('/admin-dashboard');
      } else {
        setError(data.message); // Display error message if login fails
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-sm">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded shadow-md">
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
