//BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const BookingForm = ({ pkg, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequests: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateInvoice = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Booking Invoice', 20, 20);
    doc.text(`Customer Name: ${data.name}`, 20, 30);
    doc.text(`Email: ${data.email}`, 20, 40);
    doc.text(`Phone: ${data.phone}`, 20, 50);
    doc.text(`Package: ${pkg.title}`, 20, 60);
    doc.text(`Number of Travelers: ${data.travelers}`, 20, 70);
    const totalPrice = pkg.price * data.travelers;
    doc.text(`Total Price: $${totalPrice}`, 20, 80);
    doc.save(`invoice_${data.name}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://travel-agency-cll7.onrender.com/api/bookings', {
        package_id: pkg.id, // Adjusted to match backend field name
        customer_name: formData.name, // Adjusted field name
        email: formData.email,
        phone: formData.phone,
        number_of_travelers: formData.travelers, // Adjusted field name
        special_requests: formData.specialRequests,
      });
      alert('Booking Successful! Generating invoice...');
      generateInvoice(formData);
      onClose();
    } catch (error) {
      console.error('Error booking package:', error);
    }
  };  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Book: {pkg.title}</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="travelers" placeholder="Number of Travelers" type="number" min="1" onChange={handleChange} required />
      <textarea
        name="specialRequests"
        placeholder="Special Requests"
        onChange={handleChange}
        rows="3"
        className="w-full border"
      ></textarea>
      <button className="bg-green-500 text-white py-2 px-4 rounded" type="submit">
        Submit
      </button>
    </form>
  );
};

export default BookingForm;
