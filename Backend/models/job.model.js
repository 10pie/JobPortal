import { application } from "express";
import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
    },
    salary: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required:true,
    },
    jobType: {
        type: String,
        // required: true,
    },
    position:{
        // type: Number,
        type:String,
        // required: true,
    },
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', // Reference to the Company model
        required: true, 
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, 
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application', // Reference to the Application model
    }],
    
},{timestamps:true});

 const Job = mongoose.model('Job', jobSchema);
 export default Job;
