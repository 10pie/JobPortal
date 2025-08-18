import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import path from 'path';
import User from "../models/user.model.js"; 
export const ApplyJobs = async (req,res)=>{
    try{
        const UserId=req.id;
        // console.log("UserID:- ",UserId);
        const JobId=req.params.id;
        // console.log("JobId:- ",JobId);
        const job= await Job.findById(JobId);
        if(!job){
            return res.status(401).json({
                message:"No such Job Found",
                success:false
            });
        }
        const CheckIfApplied=await Application.findOne({applicant:UserId,jobPosition:JobId});
        // console.log(CheckIfApplied);
        if(CheckIfApplied){
            return res.status(409).json({
                message:"You have already applied for the position",
                // success:"true"
            })
        }
        const NewApplication= await Application.create({
            applicant:UserId,
            jobPosition:JobId,
        });
        job.applications.push(NewApplication._id);
        await job.save();
        return res.status(200).json({
            message:"Job Applied Successfully",
            success:true,
        });
    }
    catch(error){
        console.log(error);
    }
} 

export const GetAppliedJobs = async(req,res)=>{
try{
const UserId=req.id;
const AppliedJobs=await Application.find({applicant:UserId}).sort({createdAt:-1})
.populate(
    {
     path:"jobPosition",
     options:{sort:{createdAt:-1}},
     populate:{
        path:"companyID",
        options:{sort:{createdAt:-1}},
     }
    }
);
if(!AppliedJobs||AppliedJobs.length==0){
    return res.status(404).json({
        message:"You have not Applied for any Jobs Yet!",
    });
}
else{
    return res.status(200).json({
        message:"Applied Jobs Fetched Successfully\n",
        success:"true",
        AppliedJobs,
    });
}
}
catch(error){
    console.log(error);
}
}
//for admin
export const GetApplicants = async(req,res)=>{
    try{
           const UserId=req.id;
    const user=await User.findById(UserId);
    console.log(user);
    if(!user||user.role!="recruiter"){
       return res.status(401).json({
            message:"User is Unauthorized or Not allowed to See changes",
            success:false,
        });
    }
        const JobId=req.params.id;
        const job=await Job.findById(JobId).sort({createdAt:-1}).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{path:"applicant"}
        });
        if(!job||job.length==0){
            return res.status(404).json({
                message:"No Such Jobs Found\n",
                success:"false",
            });
        }
        console.log(job);
        // console.log(job.applicant);
        const AllApplicants=job.applications;
         if(!AllApplicants||AllApplicants.length==0){
            return res.status(404).json({
                message:"No One Applied Yet",
                success:"false",
            })
         }
         else{
            return res.status(201).json({
                message:"Applicants Fetched Successfully",
                success:"true",
                AllApplicants,
            })
         }
    }
    catch(error){
        console.log(error);
    }
}

export const UpdateStatus= async(req,res)=>{
    const UserId=req.id;
    const User=await User.findById(UserId);
    console.log(User);
    if(!User||User.role!="recruiter"){
       return res.status(401).json({
            message:"User is Unauthorized or Not allowed to Change the Status",
            success:false,
        });
    }
    const {status} = req.body;
    if(!status){
          return  res.status(404).json({
            message:"status is required",
            success:false,
        });
    }
    const ApplicationId=req.params.id;
    const ApplicationToUpdate=await Application.findById(ApplicationId);
    if(!ApplicationToUpdate){
        return res.status(404).json({
            message:"No such Application found",
            success:false,
        });
    }
    ApplicationToUpdate.status=status.toLowerCase();
    await ApplicationToUpdate.save();
    return res.status(200).json({
        message:"status Updated successfully",
        success:"true"
    });
}