import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';
import { Link } from 'react-router-dom';

const TourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [search, setSearch] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://travel-agency-cll7.onrender.com/api/packages');
        setPackages(response.data);
        setFilteredPackages(response.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  // Search and filter logic
  useEffect(() => {
    let filtered = packages;

    if (search) {
      filtered = filtered.filter((pkg) =>
        pkg.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterPrice) {
      filtered = filtered.filter((pkg) => parseFloat(pkg.price) <= parseFloat(filterPrice));
    }

    setFilteredPackages(filtered);
  }, [search, filterPrice, packages]);

  const openBookingForm = (pkg) => {
    setSelectedPackage(pkg);
    setShowBookingForm(true);
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setSelectedPackage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">Explore Our Tour Packages</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex w-full md:w-2/3 space-x-4">
          <input
            type="text"
            placeholder="Search by destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Filter by price (e.g., <= 500)"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <Link to="/admin/login">
            <button className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition duration-300">
              Admin Login
            </button>
          </Link>
        </div>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={pkg.image_url || 'https://via.placeholder.com/400x250'} // Placeholder image
                alt={pkg.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{pkg.title}</h2>
                <p className="text-gray-600 mb-2">{pkg.description}</p>
                <p className="text-green-500 font-bold text-lg">Price: ${pkg.price}</p>
                <button
                  onClick={() => openBookingForm(pkg)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No packages found matching your criteria.</p>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl relative w-full max-w-lg">
            <button
              onClick={closeBookingForm}
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
            >
              &times;
            </button>
            <BookingForm pkg={selectedPackage} onClose={closeBookingForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TourPackages;
