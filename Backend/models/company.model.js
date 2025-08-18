import { name } from "ejs";
import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    website: {
        type: String,
        // required: true,
    },
    logo: {
        type:String,// URL to the company logo
        default: '', // Default logo URL
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, // Assuming a company must be associated with a user
    }
}, {timestamps: true});

const Company = mongoose.model('Company', companySchema);
export default Company;