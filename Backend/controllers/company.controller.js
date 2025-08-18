import company from '../models/company.model.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';
export const createCompany = async (req, res) => {
    try {
        console.log("Creating company with data:", req.body);
        const {companyName}  = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }
        let companyExists = await company.findOne({ name: companyName });
        if (companyExists) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }
        console.log(req.id, "ID of the user creating the company");
        const newCompany = await company.create({
           companyName,
           created_by: req.id // Assuming req.id is the ID of the user creating the company
        });
        return res.status(201).json({
            message: "Company created successfully",
            company: newCompany,
            success: true
        });
    } catch (error) {
        console.error("Error creating company:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getCompany = async (req, res) => {
    try {
       const userID= req.id; // Assuming req.id is the ID of the user making the request
       console.log("Getting companies for user ID:", userID); // Debug log
       
        const companyData = await company.find({ created_by: userID });
        console.log("Found companies:", companyData); // Debug log
        
        if (!companyData||companyData.length==0) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company retrieved successfully",
            company: companyData,
            success: true
        });
    } catch (error) {
        console.error("Error retrieving company:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const  companyId  = req.params.id;
        const companyData = await company.findById(companyId);
        if (!companyData) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company retrieved successfully",
            company: companyData,
            success: true
        });
    } catch (error) {
        console.error("Error retrieving company by ID:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        console.log(req.body);
        const file = req.file;
        console.log("File received:", file);
         // Assuming you might want to handle file uploads in the future
        let cloudResponse = null;
        if (file) {
          
            // Handle file upload to cloud storage (e.g., Cloudinary)
            try {
                const fileUri=getDataUri(file);
                // Assuming you have a cloudinary configuration set up
                // const cloudinary 
                cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    folder: 'company_files',
                    resource_type: 'auto'
                });
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({
                    message: `File upload failed: ${uploadError.message}`,
                    success: false
                });
            }
             
        }

    //cloudinary will be here
        const companyId = req.params.id;
        const companyData = await company.findById(companyId);
         companyData.logo=cloudResponse.secure_url; // Save logo URL to company
            if (!companyData) {
                  
            return res.status(404).json({
          
                message: "Company not found",
                success: false
            });
        }
        if(companyData.created_by.toString() !== req.id) {
            return res.status(403).json({
                message: "You are not authorized to update this company",
                success: false
            });
        }
        if (companyName.trim()==="") {
                console.log("here\n");
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }
        // let companyData = await company.findById(companyId);
    
        companyData.companyName = companyName;
        await companyData.save();
        return res.status(200).json({
            message: "Company updated successfully",
            company: companyData,
            success: true
        });
    } catch (error) {
        console.error("Error updating company:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}