//TourPackages.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';
import { Link } from 'react-router-dom';

const TourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://travel-agency-cll7.onrender.com/api/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

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
      <h1 className="text-2xl font-bold mb-6">Tour Packages</h1>
      <div className="flex justify-between items-center mb-6">
        <div></div> {/* Empty space for alignment */}
        <Link to="/admin/login">
        <button className="bg-red-500 text-white py-2 px-4 rounded">
          Admin Login
        </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="border p-4 rounded shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold">{pkg.title}</h2>
            <p className="text-gray-700">{pkg.description}</p>
            <p className="text-blue-600 font-bold mt-2">Price: ${pkg.price}</p>
            <button
              onClick={() => openBookingForm(pkg)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <button onClick={closeBookingForm} className="text-red-500 font-bold float-right">
              X
            </button>
            <BookingForm pkg={selectedPackage} onClose={closeBookingForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TourPackages;
