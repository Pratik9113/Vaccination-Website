

import React, { useEffect, useState } from 'react';
import './HealthcareCenters.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const vaccines = [
    { name: 'BCG', quantity: Math.floor(Math.random() * 100) }
];

const HealthcareCenters = () => {
    const navigate = useNavigate();

    const handleAppointmentButton = (setEmail) => {
        navigate(`/appointment/${setEmail}`);
    }

    const [visibleCenter, setVisibleCenter] = useState(null);
    const [visibleDetails, setVisibleDetails] = useState(null);
    const [healthcareCenters, setHealthcareCenters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const [doseCount, setDoseCount] = useState([]);

    const toggleVaccineList = (centerIndex) => {
        if (visibleCenter === centerIndex) {
            setVisibleCenter(null);
        } else {
            setVisibleCenter(centerIndex);
        }
    };

    const toggleDetails = (centerIndex) => {
        if (visibleDetails === centerIndex) {
            setVisibleDetails(null);
        } else {
            setVisibleDetails(centerIndex);
        }
    };

    useEffect(() => {
        const fetchHealthCareCenters = async () => {
            try {
                const response = await axios.get('https://vaccination-website.onrender.com/vaccine/center/get-vaccination-center');
                setHealthcareCenters(response.data.data);
            } catch (error) {
                console.log('Error Fetching data ', error);
            }
        };
        fetchHealthCareCenters();
    }, []);


    const filteredCenters = healthcareCenters.filter(center => {
        const matchesQuery = center.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = selectedLocation ? center.location.city === selectedLocation : true;
        const matchesVaccine = selectedVaccine ? vaccines.some(vaccine => vaccine.name === selectedVaccine) : true;
        return matchesQuery && matchesLocation && matchesVaccine;
    });

    return (
        <div>
            <h1 className="center-list-heading">Vaccination Center List</h1>
            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by Health care center name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="search-filter"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option value="">Filter by location</option>
                    <option value="Cityville">Mumbai</option>
                    <option value="Greendale">Greendale</option>
                    <option value="Healthcity">Healthcity</option>
                    <option value="Sunnytown">Sunnytown</option>
                    <option value="Bluetown">Bluetown</option>
                    <option value="Riverville">Riverville</option>
                    <option value="Mountainville">Mountainville</option>
                    <option value="Clearcity">Clearcity</option>
                </select>
                <select
                    className="search-filter"
                    value={selectedVaccine}
                    onChange={(e) => setSelectedVaccine(e.target.value)}
                >
                    <option value="">Filter by vaccine</option>
                    {vaccines.map((vaccine, index) => (
                        <option key={index} value={vaccine.name}>{vaccine.name}</option>
                    ))}
                </select>
                <select className="search-filter1">
                    <option value="">Select time slot</option>
                    <option value="morning">Morning Slot: 10am - 12.30pm</option>
                    <option value="afternoon">Late Afternoon Slot: 3.30pm - 5.30pm</option>
                    <option value="evening">Evening Slot: 7pm - 8.30pm</option>
                </select>
                <button className="search-button">Search</button>
            </div>
            <div className="grid grid-cols-3 p-5">
                {filteredCenters.map((center, index) => (
                    <div key={index} className="healthcare-card">
                        <div className="flex justify-center"><img className='w-90 h-90' src="../../public/carousel3.jpg" alt={center.name} /></div>
                        <h3>{center.name}</h3>
                        <button
                            className="check-vaccine-btn"
                            onClick={() => toggleVaccineList(index)}
                        >
                            Check Vaccine Quantity
                        </button>
                        {visibleCenter === index && (
                            <div className="vaccine-quantity-list">
                                <h4>Vaccine Quantities at {center.name}</h4>
                                {center.vaccineDetails.map((vaccine, i) => (
                                    <p key={i}>
                                        {vaccine.name}: {vaccine.stock} doses left
                                    </p>
                                ))}
                                <button onClick={() => handleAppointmentButton(center.email)}>Appointment</button>
                            </div>
                        )}
                        <button
                            className="view-details-btn"
                            onClick={() => toggleDetails(index)}
                        >
                            View Details
                        </button>
                        {visibleDetails === index && (
                            <div className="details-list">
                                <h4>Contact Info</h4>
                                <p>Phone: {center.phone}</p>
                                <p>Address: {center.location.address}, {center.location.city}, {center.location.state}, {center.location.postalCode}</p>
                            </div>
                        )}
                    </div>
                )
                )}

            </div>
        </div>
    );
};

export default HealthcareCenters;
