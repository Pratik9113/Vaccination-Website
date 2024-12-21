import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import 'chart.js/auto';
import './VaccinationRecord.css';
import { Clock, Activity, Phone, MapPin } from 'lucide-react';
import { assets } from '../../../assets/assets';

const VaccinationRecord = () => {
  const [childProfiles, setChildProfiles] = useState([]);


  useEffect(() => {
    fetchChildProfiles();
  }, []);

  const fetchChildProfiles = async () => {
    try {
      const response = await axios.get(
        `https://vaccination-website.onrender.com/parent/child/children`,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.data.success) {
        setChildProfiles(response.data.data);
      } else {
        console.error('Error fetching child profiles');
      }
    } catch (error) {
      console.error('Error fetching child profiles:', error);
    }
  };

  const calculateVaccinationPercentage = (vaccinationHistory) => {
    if (!Array.isArray(vaccinationHistory) || vaccinationHistory.length === 0) {
      return 0;
    }
    const totalVaccines = vaccinationHistory.length;
    const administeredVaccines = vaccinationHistory.filter(
      (vaccine) => vaccine.vaccinationStatus === 'Administered'
    ).length;
    const percentage = (administeredVaccines / totalVaccines) * 100;
    return percentage.toFixed(2);
  };

  const handleGenerateCertificate = (child) => {
    const administeredVaccines = child.vaccinationHistory.filter(
      (vaccine) => vaccine.vaccinationStatus === 'Administered'
    );

    if (administeredVaccines.length > 0) {
      const certificateContent = `
        <h1>Vaccination Certificate</h1>
        <p>This certifies that</p>
        <h2>${child.name}</h2>
        <p>has been vaccinated.</p>
        <p>Thank you!</p>
      `;

      const blob = new Blob([certificateContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${child.name}_vaccination_certificate.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert('This child has not been vaccinated yet.');
    }
  };

  const renderChildInfo = (child) => {
    const administeredVaccines = child.vaccinationHistory.filter(
      (vaccine) => vaccine.vaccinationStatus === 'Administered'
    ).length;
    const totalVaccines = child.vaccinationHistory.length;

    const vaccineData = {
      labels: ['Administered', 'Pending'],
      datasets: [
        {
          label: 'Vaccination Status',
          data: [administeredVaccines, totalVaccines - administeredVaccines],
          backgroundColor: ['#4CAF50', '#FF5722'],
          hoverBackgroundColor: ['#45a049', '#e64a19'],
        },
      ],
    };

    const percentage = calculateVaccinationPercentage(child.vaccinationHistory);

    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex items-center">
              <img src={assets.childImage} alt="Child" className="w-24 h-24 rounded-full mr-4" />
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{child.name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {child.age} years old • {child.gender}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Next appointment: *** </p>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Child DOB</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(child.dob).toISOString().split('T')[0]}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <MapPin size={16} className="mr-2" />
                    {child.address.street} {child.address.city} {child.address.state} {child.address.postalCode}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Primary Care Doctor</dt>
                  <dd className="mt-1 text-sm text-gray-900">None</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Vaccination Progress */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Vaccination Progress</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Progress
                  </span>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {percentage}%
                  </span>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Vaccinations  Done */}
          {/* <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Vaccinations</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {child.upcomingVaccinations.length === 0 ? (
                <li className="px-4 py-4 sm:px-6">No upcoming vaccinations.</li>
              ) : (
                child.upcomingVaccinations.map((vaccine, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="mr-3 text-gray-400" size={20} />
                        <p className="text-sm font-medium text-gray-900">{vaccine.vaccineName}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Due on {new Date(vaccine.suggestedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div> */}

          {/* Vaccination History */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Vaccination History</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {child.vaccinationHistory.length === 0 ? (
                <li className="px-4 py-4 sm:px-6">No vaccination history available.</li>
              ) : (
                child.vaccinationHistory.map((vaccine, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="mr-3 text-gray-400" size={20} />
                        <p className="text-sm font-medium text-gray-900">{vaccine.vaccineName}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vaccine.vaccinationStatus === 'Administered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {vaccine.vaccinationStatus}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>


          {/* Generate Certificate */}
        </main>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => handleGenerateCertificate(child)}
          >
            Generate Certificate
          </button>
        </div>

      </div>
    );
  };

  return (
    <div className="container mx-auto py-4">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        Vaccination Records
      </Typography>
      {childProfiles.length === 0 ? (
        <p>No child profiles found.</p>
      ) : (
        childProfiles.map((child, index) => (
          <div key={index} className="mb-8">
            {renderChildInfo(child)}
          </div>
        ))
      )}
    </div>
  );
};

export default VaccinationRecord;
