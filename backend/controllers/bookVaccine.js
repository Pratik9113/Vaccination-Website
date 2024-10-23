import { SendmailTransport } from "../sendMail.js";

export const bookVaccine = async (req, res) => {
    const { email, vaccinationEmail, vaccine, date, time} = req.body;

    try {
        const bookingDetails = {
            email,
            vaccinationEmail,
            vaccine,
            date,
            time,
        };
        await SendmailTransport(email, vaccine, 'Your vaccine booking details', date);
        await SendmailTransport(vaccinationEmail, vaccine, `vaccine booking details by ${email}`, date);
        res.status(200).json({ message: 'Vaccine booked successfully', bookingDetails });
    } catch (error) {
        console.error('Error booking vaccine:', error);
        res.status(500).json({ message: 'Error booking vaccine' });
    }
};
