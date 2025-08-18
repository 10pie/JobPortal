import express from "express";
import {createCompany,getCompany,getCompanyById,updateCompany} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const companyRouter=express.Router();

companyRouter.route("/create").post(isAuthenticated,createCompany);
companyRouter.route("/get").get(isAuthenticated,getCompany);
companyRouter.route("/get/:id").get(getCompanyById);
companyRouter.route("/update/:id").put(singleUpload,isAuthenticated,updateCompany)
export default companyRouter;