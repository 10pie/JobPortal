import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({}); // Load environment variables from .env file
import connectDB from './utils/db.js'; // Import the connectDB function
import router from './routes/user.route.js';
import companyRouter from './routes/company.route.js'; // Import company routes
import JobRouter from './routes/job.route.js';
import ApplicationRouter from './routes/Application.route.js';
const PORT=process.env.PORT||3000;
const app = express();
app.use(express.json());
app.use(cookieParser());    
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  // Use a regular expression to match any subdomain of vercel.app
  // This is a more robust solution for Vercel's preview deployments.
  origin: [
    "http://localhost:5173",
    /https:\/\/job-portal-.*\.vercel\.app$/
  ],
  credentials: true,
};

// app.use(cors(corsOptions));

app.use(cors(corsOptions)); // Enable CORS with the specified options
// Parse URL-encoded form data (from HTML forms)
 app.use("/api/v1/user",router)
 app.use("/api/v1/company",companyRouter) // Use company routes
 app.use("/api/v1/job",JobRouter);
 app.use("/api/v1/application",ApplicationRouter)
// http://localhost:8000/api/v1/users/register
app.get("/home",(req,res)=>{
    console.log("Home route accessed");
    return res.status(200).json({
        message:"Welcome to the Job Portal Backend",
        status: "success"
    });
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})
