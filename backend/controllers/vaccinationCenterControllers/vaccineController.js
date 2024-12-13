import VaccinationCenter from "../../models/vaccinationCenterModels/vaccinationCenterModel.js";
import vaccineModelSchema from "../../models/vaccinationCenterModels/vaccineModel.js";
const createVaccine = async (req, res) => {
    try {
        const { email, name, type, manufacturer, doseCount, stock, expiryDate, description } = req.body;
        console.log(req.body);
        if (!email || !name || !type || !manufacturer || !doseCount || !stock || !expiryDate || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const vaccinationCenter = await VaccinationCenter.findOne({ email });
        
        if (!vaccinationCenter) {
            return res.status(404).json({ message: "Vaccination center not found" });
        }

        vaccinationCenter.vaccineDetails.push({
            name,
            type,
            manufacturer,
            doseCount,
            stock,
            expiryDate,
            description,
        });

        await vaccinationCenter.save();

        res.status(201).json({
            success: true,
            message: "Vaccine created successfully",
        });
    } catch (error) {
        console.error("Error creating vaccine:", error);
        res.status(500).json({
            success: false,
            message: "Error creating vaccine",
            error: error.message,
        });
    }
};
const getAllVaccines = async(req,res) =>{
    try {
        const vaccines = await vaccineModelSchema.find();
        res.status(200).json({
            message : "vaccines retrieved successfully",
            data : vaccines
        })
    } catch (error) {
        res.status(500).json({
            message:"error retrieving vaccine",
            error:error.message
        })
    }
}

const getVaccinesById = async(req,res) =>{ 
    try {
        const vaccineId = req.params.id;
        const vaccine = await vaccineModelSchema.findById(vaccineId);
        if(!vaccine){
            return res.status(404).json({
                message:"vaccine not found"
            })
        }
        res.status(200).json({
            message:'vaccine retrieved successfully',
            data :vaccine
        })
    } catch (error) {
        res.status(500).json({
            message:'error retrieving vaccine',
            error : error.message
        })
    }
}

export {createVaccine, getAllVaccines, getVaccinesById};