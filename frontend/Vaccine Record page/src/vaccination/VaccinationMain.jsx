import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import './VaccinationMain.css';
import VaccineRegisterForm from '../components/VaccineRegisterForm/VaccineRegisterForm';
import SidebarVaccine from '../components/Sidebar/Sidebar';
import CenterInfo from '../components/CenterInfo/CenterInfo';
import ScheduleViewer from '../components/Schedule_viewer/Scheduleviewer';
import Notify from '../components/Notifyparent/Notify';
import VaccineAdd from '../pages/VaccineAdd';

const VaccinationMain = () => {
    return (
        <div className="vaccination-app">
            <SidebarVaccine />
            <Routes>
                <Route path="/vaccine-register" element={<VaccineRegisterForm />} />
                <Route path="/center-info" element={<CenterInfo />} />
                <Route path="/schedule-viewer" element={<ScheduleViewer />} />
                <Route path="/notify-parent" element={<Notify />} />
                <Route path="/vaccine-add" element={<VaccineAdd />} />

            </Routes>
        </div>
    );
};

export default VaccinationMain;