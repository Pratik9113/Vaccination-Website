import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import vaccinationUserRouter from "./routes/vaccinationRoutes/vaccinationUserRoute.js";
import vaccinationCenterRouter from "./routes/vaccinationRoutes/vaccinationCenterRoute.js";
import parentUserRouter from "./routes/parentRoutes/parentUser.js";
import parentCreateRouter from "./routes/parentRoutes/childParentRoute.js";
import 'dotenv/config';
import mailRouter from "./routes/mail.js";
import rateLimit from "express-rate-limit"; 
import bookVaccineRouter from "./routes/bookVaccineRoute.js";
import startCron from "./node_cron.js";

const app = express();
const serverLive = process.env.PORT || 4512;

const allowedOrigins = [
    'http://localhost:5173',
    'https://vaccination-website-three.vercel.app'

];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

// Middleware setup
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

const limiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 10, 
    message: 'Too many requests from this IP, please try again after a minute.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);


// Parent routes for user and child management
app.use("/parent/user", parentUserRouter);
app.use("/parent/child", parentCreateRouter);
app.use("/parent/child/book",bookVaccineRouter);

// Vaccination routes for user and centers
app.use("/vaccine/user", vaccinationUserRouter);
app.use("/vaccine/center", vaccinationCenterRouter);


// Message Gmail 
app.use("/api/mail",mailRouter);

console.log(process.env.SECRET);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
startCron();
app.listen(serverLive, () => {
    console.log(`Server is running on port ${serverLive}`);
});
