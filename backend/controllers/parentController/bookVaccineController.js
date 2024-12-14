import Appointment from "../../models/bookVaccineModels.js"; 
import ChildProfile from "../../models/parentModels/childModel.js";

// Function to book a vaccine appointment
const bookingVaccine = async (req, res) => {
    const { email, vaccinationEmail, vaccine,childName, date, time } = req.body;
    const { userId } = req.user;

    console.log(req.user);
    console.log(req.body);

    try {  
        const parsedDate = new Date(date);
        const newAppointment = new Appointment({ 
            userId, 
            email, 
            vaccinationEmail,
            vaccine, 
            childName,
            date: parsedDate, 
            time 
        });
        
        await newAppointment.save();

        res.status(200).json({ message: 'Appointment successfully booked!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error booking appointment' });
    }
};

const getBookingByEmail = async (req, res) => {
    const { email } = req.params;
    console.log(email);
    try {
        const bookings = await Appointment.find({ email });
        if (bookings.length === 0) {
            return res.status(404).json({
                message: 'No bookings found for this email.',
                bookings: [],
            });
        }
        return res.status(200).json({
            message: 'Bookings retrieved successfully.',
            bookings,
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return res.status(500).json({
            message: 'Internal server error.',
            error: error.message,
        });
    }
};


const updateChildProfileVaccine = async (req, res) => {
    console.log('Update vaccine route hit');

    const { email, vaccine, childName, status } = req.body;

    try {
        console.log('Request data:', req.body);

        const childProfile = await ChildProfile.findOne({ email, name: childName });
        if (!childProfile) {
            return res.status(404).json({ success: false, message: 'Child not found' });
        }


        const appointment = await Appointment.findOne({ email, childName, vaccine });
        console.log("Appointment data ")
        console.log(appointment)
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();

        console.log('Appointment status updated successfully:', appointment);

        const vaccinationRecord = childProfile.vaccinationHistory.find(
            (record) => record.vaccineName === vaccine
        );

        if (!vaccinationRecord) {
            return res.status(404).json({
                success: false,
                message: 'Vaccination record not found for the specified vaccine',
            });
        }

        // Update the vaccination record
        vaccinationRecord.vaccinationStatus = status;
        if (status === 'Administered') {
            vaccinationRecord.dateAdministered = new Date();
        }

        await childProfile.save();

        console.log('Child profile updated successfully:', childProfile);
        return res.status(200).json({
            success: true,
            message: 'Vaccination status updated successfully',
        });
    } catch (error) {
        console.error('Error updating vaccination status:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export { bookingVaccine, getBookingByEmail, updateChildProfileVaccine};
