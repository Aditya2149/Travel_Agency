//adminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]); // To hold package data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    available_dates: '',
    image_url: '',
  }); // For Add/Update form
  const [editingPackage, setEditingPackage] = useState(null); // Track the package being edited

  // Fetch existing packages
  const fetchPackages = async () => {
    try {
      const response = await axios.get('https://travel-agency-cll7.onrender.com/api/packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error.message);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update package
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      let datesArray = formData.available_dates;
  
      // Check if available_dates is an array or a string
      if (typeof datesArray === 'string') {
        // Convert string to array if it's a comma-separated string
        datesArray = datesArray.split(',').map(date => date.trim());
      }
  
      // Ensure available_dates is an array before sending to the API
      const packageData = { ...formData, available_dates: datesArray };
  
      if (editingPackage) {
        // Update Package
        await axios.put(`https://travel-agency-cll7.onrender.com/admin/packages/${editingPackage.id}`, packageData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('Package updated successfully!');
      } else {
        // Add Package
        await axios.post('https://travel-agency-cll7.onrender.com/admin/packages', packageData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('Package added successfully!');
      }
      fetchPackages(); // Refresh the package list
      setFormData({ title: '', description: '', price: '', available_dates: '', image_url: '' });
      setEditingPackage(null);
    } catch (error) {
      console.error('Error submitting package:', error.message);
    }
  };  
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`https://travel-agency-cll7.onrender.com/admin/packages/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('Package deleted successfully!');
        fetchPackages();
      } catch (error) {
        console.error('Error deleting package:', error.message);
      }
    }
  };


  // Populate form for editing
  const handleEdit = (pkg) => {
  setFormData({
    title: pkg.title,
    description: pkg.description,
    price: pkg.price,
    available_dates: pkg.available_dates.join(', '),  // Join array as a comma-separated string
    image_url: pkg.image_url,
  });
  setEditingPackage(pkg);
};


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Manage Tour Packages</h1>

      {/* Form for Adding/Editing a Package */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 border p-4 rounded shadow-md">
        <h2 className="text-2xl font-semibold">
          {editingPackage ? 'Edit Package' : 'Add New Package'}
        </h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows="3"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="available_dates"
          value={formData.available_dates}
          onChange={handleInputChange}
          placeholder="Available Dates (e.g., 2024-10-12, 2024-11-01)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editingPackage ? 'Update Package' : 'Add Package'}
        </button>
        {editingPackage && (
          <button
            type="button"
            onClick={() => {
              setEditingPackage(null);
              setFormData({ title: '', description: '', price: '', available_dates: '', image_url: '' });
            }}
            className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Table to Display Packages */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Available Dates</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id} className="text-center">
              <td className="border p-2">{pkg.id}</td>
              <td className="border p-2">{pkg.title}</td>
              <td className="border p-2">${pkg.price}</td>
              <td className="border p-2">{pkg.available_dates}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {packages.length === 0 && (
            <tr>
              <td colSpan="5" className="border p-4 text-center">
                No packages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
