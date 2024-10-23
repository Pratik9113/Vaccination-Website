import cron from "node-cron";
import Appointment from "./models/bookVaccineModels.js";
import { SendmailTransport } from "./sendMail.js";

const startCron = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const allAppointments = await Appointment.find();
            const now = new Date();
            for (let appointment of allAppointments) {
                const appointmentDate = new Date(appointment.date);
                const timeDiff = appointmentDate.getTime() - now.getTime();
                
                const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                if (daysDiff === 10) {
                    await SendmailTransport({
                        to: appointment.email, 
                        subject: "Vaccine Appointment Reminder",
                        text: `Your vaccine appointment is scheduled for ${appointmentDate.toDateString()} which is 10 days away. Please make sure you're prepared.`
                    });
                }
            }
        } catch (error) {
            console.error("Error in the cron job:", error);
        }
    });
};
export default startCron;