import Job from '../models/job.model.js';
import user from '../models/user.model.js';
 export const createJob = async(req,res)=>{
    try{
        const {title, description, location, salary, experience, companyID, position, jobType} = req.body;
        console.log(req.body);
        if (!title || !description || !location || !salary || !experience || !companyID || !position || !jobType) {
            console.log({title, description, location, salary, experience, companyID, position, jobType});
            return res.status(400).json({ message: 'All fields are required' });
        }
         const userId = req.id;
         const User= await user.findById(userId);
         if(User.role!='recruiter'){
           return res.status(403).json({
                message: "You are not authorized to create a job",
            });
         }
        const newJob= await Job.create({
            title, 
            description,
            location,
            salary,
            experience, 
            position,
            jobType,
            created_by: userId,
            companyID
        });
        return res.status(201).json({
            message: "Job created successfully",
            Job: newJob,
            success: true
        });
    }
    catch(err){
        console.log(err);
    }
};

export const GetAllJobs= async(req,res)=>{
  try{
    const keyword = req.query.keyword || "";
    console.log(`Searching for jobs with keyword: "${keyword}"`);
    
    // Debug: Show all jobs first
    const allJobs = await Job.find({});
    console.log(`Total jobs in database: ${allJobs.length}`);
    console.log("All job titles:", allJobs.map(job => job.title));

    let query = {};
    
    // If keyword exists, create search query
    if(keyword && keyword.trim() !== "") {
        query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
                {location: {$regex: keyword, $options: "i"}},
                {jobType: {$regex: keyword, $options: "i"}}
            ]
        };
    }

    console.log("Search query:", JSON.stringify(query, null, 2));

    const jobs = await Job.find(query)
                .populate({path: "companyID"})
                .sort({createdAt: -1});

    console.log(`Found ${jobs.length} jobs matching query`);
    if(jobs.length > 0) {
        console.log("Matching jobs:", jobs.map(job => ({ 
            title: job.title, 
            description: job.description,
            _id: job._id
        })));
    }

    // FIXED: Always return response, don't throw error
    return res.status(200).json({
        message: jobs.length > 0 ? "Jobs fetched successfully" : "No jobs found matching your search",
        jobs,
        success: true
    });

  } catch(error) {
    console.error("Error in GetAllJobs:", error);
    return res.status(500).json({
        message: `Some error occurred: ${error.message}`,
        success: false
    });
  }
}

export const getJobById = async(req,res)=>{
    try{
        const id=req.params.id;
        const jobs=await Job.findById(id).populate({
            path: 'applications',
        });
        if(!jobs){
            return res.status(404).json({
                message:"No such Jobs find\n",
                success:false
            });
        }
        else{
              return res.status(201).json({
                message:"Jobs Fetched successfully\n",
                success:true,
                jobs
            });
        }
    }
    catch(error){
        console.log(error);
    }
}

export const GetAllJobsByAdmin = async(req,res)=>{
    try {
        const AdminId=req.id;
        console.log("Getting jobs for admin ID:", AdminId); // Debug log
        
        const jobs=await Job.find({created_by:AdminId}).populate({
            path:"companyID"
        }).sort({createdAt:-1});
        
        console.log("Found admin jobs:", jobs.length); // Debug log
        
        if(!jobs||jobs.length==0){
            return res.status(404).json({
                message:"No Jobs Found",
                success:false,
            });
        }
        else{
            return res.status(200).json({
                message:"Jobs fetched Successfully",
                success:true,
                jobs
            });
        }
    } catch (error) {
        console.error("Error in GetAllJobsByAdmin:", error);
        return res.status(500).json({
            message:"Server error",
            success:false
        });
    }
}
