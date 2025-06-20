import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

const app = express();
const _dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Setup
const corsOptions = {
    origin: ["http://localhost:5173", "https://jobportal-gg.onrender.com", "https://job-portal-frontend-six-opal.vercel.app"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
};
app.use(cors(corsOptions));

// Update cookie settings
app.use(cookieParser());
app.use((req, res, next) => {
    res.cookie('token', req.cookies.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.onrender.com'
    });
    next();
});

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve Frontend Build Files
app.use(express.static(path.join(_dirname, "frontend", "dist")));

// Wildcard Route (keep this LAST)
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// });

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
