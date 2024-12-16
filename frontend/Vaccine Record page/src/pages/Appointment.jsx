
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Appointment = () => {
    const { email } = useParams();
    const [formData, setFormData] = useState({
        email: '',
        vaccinationEmail: email,
        vaccine: '',
        childName: '',
        date: '',
        time: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://vaccination-website.onrender.com/parent/child/book/book-vaccine', formData, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });


            const sendEmail = await axios.post(`https://vaccination-website.onrender.com/api/mail/book-vaccine`,
                {
                    email: formData.email,
                    vaccinationEmail: formData.vaccinationEmail,
                    vaccine: formData.vaccine,
                    date: formData.data,
                    time: formData.time,
                }
            )

            setMessage(response.data.message);
            setError('');
        } catch (error) {
            console.error('Error booking vaccine:', error);
            setError('There was an error booking the vaccine.');
            setMessage('');
        }


    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Book Your Vaccine Appointment</h2>
                <form onSubmit={handleSubmit}>
                    {/* Vaccination Center Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Vaccination Center Email:</label>
                        <input
                            type="email"
                            name="vaccinationEmail"
                            value={email}
                            disabled
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* User Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Your Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Vaccine Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Vaccine Name:</label>
                        <input
                            type="text"
                            name="vaccine"
                            value={formData.vaccine}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Child Name:</label>
                        <input
                            type="text"
                            name="childName"
                            value={formData.childName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Preferred Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Preferred Time */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Preferred Time Slot:</label>
                        <select
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select a time slot</option>
                            <option value="morning">Morning (10:00 AM - 12:30 PM)</option>
                            <option value="afternoon">Afternoon (3:30 PM - 5:30 PM)</option>
                            <option value="evening">Evening (7:00 PM - 8:30 PM)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                    >
                        Book Vaccine
                    </button>
                </form>

                {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
                {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
            </div>
        </div>
    );
};

export default Appointment;
