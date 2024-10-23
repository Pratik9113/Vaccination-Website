import React from 'react'
import ChildProfile from '../ChildProfile/ChildProfile'
import VaccinationRecord from '../ParentProfile/VaccinationRecord/VaccinationRecord'
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';

const ChildMainClass = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/view" element={<VaccinationRecord />}></Route>
                <Route path="/cp/*" element={<ChildProfile />}></Route>
            </Routes>
        </>
    )
}

export default ChildMainClass
