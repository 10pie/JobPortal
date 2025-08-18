import mongoose from 'mongoose';
const applicationSchema = new mongoose.Schema({
    jobPosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference to the Job model
        required: true,
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User', // Reference to the User model
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted',  'rejected'],
        default: 'pending', // Default status is pending
    },
  // Automatically manage createdAt and updatedAt fields

},{timestamps:true});

 const Application = mongoose.model('Application', applicationSchema);

  export default Application;