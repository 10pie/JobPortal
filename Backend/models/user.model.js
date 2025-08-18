import mongoose, { mongo } from "mongoose";
 const userSchema = new mongoose.Schema({
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        Password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['student', 'recruiter'],
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        profile: {
            bio: {
                type: String,
            },
            skills: {
                type: [String],
            },
            resume: {
                type: String, // URL to the resume file
            },
            resumeOriginalName: {
                type: String, // Original name of the resume file   
            },
            profilePhoto: {
                type: String, // URL to the profile picture
                default: '', // Default profile photo
            },
            company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to the Company model
        },
        },
      {timestamps:true}
    );

    const User = mongoose.model('User', userSchema);
    export default  User;