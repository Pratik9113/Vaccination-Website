import vaccineModelSchema from "../../models/vaccinationCenterModels/vaccineModel.js";


const createVaccine = async (req, res) => {
    try {
        const { email, name, type, manufacturer, doseCount, stock, expiryDate, description } = req.body;

        // Validate required fields
        if (!email || !name || !type || !manufacturer || !doseCount || !stock || !expiryDate || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create new vaccine document
        const vaccine = new vaccineModelSchema({
            email,
            name,
            type,
            manufacturer,
            doseCount,
            stock,
            expiryDate,
            description,
        });

        // Save the vaccine to the database
        await vaccine.save();

        // Send success response
        res.status(201).json({
            message: "Vaccine created successfully",
            data: vaccine,
        });
    } catch (error) {
        res.status(500).json({
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