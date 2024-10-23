import express from "express";
import { jwtAuth } from "../middleware/auth.js";
import { bookingVaccine, getBookingByEmail, updateChildProfileVaccine } from "../controllers/parentController/bookVaccineController.js";
const bookVaccineRouter = express.Router();
bookVaccineRouter.post("/book-vaccine",jwtAuth,bookingVaccine );
bookVaccineRouter.get("/get-vaccine-details/:email",getBookingByEmail);

bookVaccineRouter.put("/update-child-vaccine",updateChildProfileVaccine);
export default bookVaccineRouter