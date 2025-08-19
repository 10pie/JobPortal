import user from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';
export const register= async(req,res)=>{
    try{
          console.log("Body:", req.body); // fullname, email, etc.
        // console.log("File:", req.file); // uploaded fil
        const {fullname,email,phoneNumber,Password,role}=req.body;
        console.log("Registering user:", req.body);
        if(!fullname||!email||!Password||!phoneNumber||!role){
            console.log("here");
            return res.status(400).json({
                message:"All Fields are required",
                success:false
            });
        };
        const file=req.file;
        let cloudResponse ;
        if(file){
         const fileUri=getDataUri(file);
          cloudResponse= await cloudinary.uploader.upload(fileUri.content);
        
        }
        // console.log("here");
        let User=await user.findOne({email});
        // console.log("User found:", User);
        // console.log("till here");
        if(User){
            return res.status(400).json({
                message:"User already exist with this email",
                success:false
            })
        }
        const hashPassword = await bcrypt.hash(Password,10);
        User=await user.create({
            fullname,
            email,
            phoneNumber,
            Password:hashPassword,
            role,
            profile:{
                profilePhoto: file ? cloudResponse.secure_url : null, // Use cloudResponse if file exists
    
            }
        });
        return res.status(201).json({
            message:"Account Created Successfully!",
            User,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}

export const login = async(req,res)=>{
    try{
        const {email,Password,role}=req.body;
       
        if(!email||!Password||!role){
            return res.status(400).json({
                message:"Some Fields are missing",
                 success:false
            });
        }
         console.log(req.body);
        let User= await user.findOne({email});
        console.log(User);
        if(!User){
            return res.status(400).json({
                message:"No Such User Exists",
                success:false
            });
        }
        console.log(Password);
        console.log(User.Password);
        const isPasswordMatch=await bcrypt.compare(Password,User.Password);
        console.log(isPasswordMatch);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect Password or email",
                success:false,
            });
        }
        // console.log("::\nnn");
        if(role!=User.role){
            return res.status(400).json({
                message:"User doesn't exist for this role",
                success:false,
            });
        }
        const tokenData = {
            userId:User._id
        }
        console.log("tokenData:- " ,tokenData);
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});
        User={
            _id:User._id,
            fullname:User.fullname,
            email:User.email,
            phoneNumber:User.phoneNumber,
            role:User.role,
            profile:User.profile
        }
        console.log("Reached till here\n");
        console.log(User);
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'none'}).json({
              
            message:`Logged in Successfully, Welcome Back ${User.fullname}`,
            User,
          
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}

export const logout= async(req,res)=>{
    try{
    return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logged Out successfully",
        success:true
    });
    }
    catch(error){
        console.log(error);
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {fullname,email,Password,bio,skills,phoneNumber}=req.body;
        console.log("Updating profile for user ID:", req.id);
        const file=req.file;

        //cloudinary will be here
        let cloudResponse;
        if(file){
            try {
                console.log("File received:", {
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size
                });
                
                // Validate file type
                if (file.mimetype !== 'application/pdf') {
                    return res.status(400).json({
                        message: "Only PDF files are allowed",
                        success: false
                    });
                }
                
                const fileUri=getDataUri(file);
                console.log("DataURI created successfully");
                
                cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "raw", // Use "raw" for PDFs specifically
                    folder: "resumes",
                    public_id: `resume_${Date.now()}`, // Unique public ID
                    use_filename: true,
                    // flags: "attachment:false" // This should prevent download behavior
                });
                
                console.log("Cloudinary upload successful:", {
                    url: cloudResponse.secure_url,
                    public_id: cloudResponse.public_id,
                    resource_type: cloudResponse.resource_type
                });
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({
                    message: `File upload failed: ${uploadError.message}`,
                    success: false
                });
            }
        }
        const userId = req.id; // Get user ID from authentication middleware
        let User=await user.findById(userId);
        if(!User){
            return res.status(400).json({
                message:"No such user",
                success:false
            });
        }
        if(fullname)
        User.fullname=fullname
    if(email)
        User.email=email
    if(phoneNumber)
        User.phoneNumber=phoneNumber
    if(bio)
        User.profile.bio=bio
    if(skills){
        const skillsArray=skills.split(",");
        const userId=req.id;
        User.profile.skills=skillsArray
    }
        
        //resume 
    if(cloudResponse){
        // Create a URL that opens PDF in browser instead of downloading
        const viewUrl = cloudResponse.secure_url;
        User.profile.resume = viewUrl;
        User.profile.resumeOriginalName=file.originalname;
    }

        await User.save();

          User={
            _id:User._id,
            fullname:User.fullname,
            email:User.email,
            phoneNumber:User.phoneNumber,
            role:User.role,
            profile:User.profile
        }
        return res.status(200).json({
            message:"Profile updated successfully",
            user: User, // Change User to user to match frontend expectation
            success:true
        })
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
}
