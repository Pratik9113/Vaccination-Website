import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    vaccinationEmail: {type: String, required: true},
    childName : {type:String, required:true},
    vaccine: { type: String, required: true },
    date: { type: Date, required: true }, 
    time: { type: String, required: true }, 
    status: { type: String, default: 'Scheduled' }
}, { timestamps: true });

const Appointment = mongoose.models.user || mongoose.model('appointment', appointmentSchema);
export default Appointment;
