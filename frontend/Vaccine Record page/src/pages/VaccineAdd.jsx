import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {StoreContext} from "../context/StoreContext"
import { useContext } from "react";
const VaccineAdd = () => {
    const { email } = useContext(StoreContext);
    const [name, setname] = useState("");
    const [type, settype] = useState("");
    const [manufacturer, setmanufacturer] = useState("");
    const [doseCount, setdoseCount] = useState("");
    const [stock, setstock] = useState("");
    const [expiryDate, setexpiryDate] = useState("");
    const [description, setdescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleVaccineSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://vaccination-website.onrender.com/vaccine/center/update-vaccine-count',
                {
                    email,
                    name,
                    type,
                    manufacturer,
                    doseCount,
                    stock,
                    expiryDate,
                    description,
                }
            );

            if(response.data.success){
                toast.success(response.data.message);
            }else{
                toast.success(response.data.message)
            }
            setname("");
            settype("");
            setmanufacturer("");
            setdoseCount("");
            setstock("");
            setexpiryDate("");
            setdescription("");
        } catch (error) {
            console.error('Error Vaccine profile:', error);
            toast.error('An error occurred while saving the profile. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-4">Add Vaccine</h2>
                    {successMessage && (
                        <div className="mb-4 p-2 text-green-600 bg-green-100 rounded">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleVaccineSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded"
                                value={email}
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Vaccine Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Type</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={type}
                                onChange={(e) => settype(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Manufacturer</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={manufacturer}
                                onChange={(e) => setmanufacturer(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Dose Count</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={doseCount}
                                onChange={(e) => setdoseCount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Stock</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={stock}
                                onChange={(e) => setstock(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Expiry Date</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={expiryDate}
                                onChange={(e) => setexpiryDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="3"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 text-white bg-green-600 rounded"
                        >
                            Add Vaccine
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VaccineAdd;
