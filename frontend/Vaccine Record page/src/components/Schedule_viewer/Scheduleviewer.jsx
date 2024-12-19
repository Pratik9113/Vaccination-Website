import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { StoreContext } from '../../context/StoreContext';

const ScheduleViewer = () => {
    const { email: centerEmail } = useContext(StoreContext);
    console.log(centerEmail)
    const [email, setEmail] = useState('');
    const [searchResults, setSearchResults] = useState([]); // Changed to an array
    const [error, setError] = useState('');



    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://vaccination-website.onrender.com/parent/child/book/get-vaccine-details/${email}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if there are bookings
            if (response.data.bookings && response.data.bookings.length > 0) {
                setSearchResults(response.data.bookings); // Set all bookings
                setError('');
            } else {
                setSearchResults([]);
                setError('No registration found for this email.');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setSearchResults([]);
            setError('Error fetching booking details. Please try again.');
        }
    };
    const handleMarkDone = async (vaccineResult) => { // Pass vaccineResult to this function
        try {
            if (!vaccineResult) {
                setError('No vaccine record found to mark as done.');
                return;
            }

            const response = await axios.put('https://vaccination-website.onrender.com/parent/child/book/update-child-vaccine', {
                centerEmail: centerEmail,
                email: vaccineResult.email,
                vaccine: vaccineResult.vaccine,
                childName: vaccineResult.childName,
                status: 'Administered',
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Handle the response
            if (response.data.success) {
                // Update the UI with the new status
                setSearchResults(prevResults => prevResults.map(result =>
                    result.email === vaccineResult.email && result.vaccine === vaccineResult.vaccine
                        ? { ...result, vaccinationStatus: 'Administered' }
                        : result
                ));
                setError(''); // Clear error
                toast.success(response.data.message);
            } else {
                setError('Failed to update vaccine status.');
            }
        } catch (error) {
            console.error("Error updating vaccine status:", error);
            setError('Error marking the vaccine as done. Please try again.');
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>View the Schedule</h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                    type="email"
                    placeholder="Enter parent's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button
                    onClick={handleSearch}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Search
                </button>
            </div>

            {error && (
                <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            {searchResults.length > 0 && (
                <div>
                    {searchResults.map((result, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                            <h3 style={{ fontWeight: 'bold' }}>{result.name}</h3>
                            <p>Email: {result.email}</p>
                            <p>Vaccine: {result.vaccine}</p>
                            <p>childName: {result.childName}</p>
                            <p>Date: {result.date}</p>
                            <p>Time: {result.time}</p>
                            {result.status === 'Scheduled' && (
                                <button
                                    onClick={() => handleMarkDone(result)} // Pass the current result
                                    style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Mark as Done
                                </button>
                            )}
                            {result.status === 'done' && (
                                <h5>Already Done</h5>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ScheduleViewer;
