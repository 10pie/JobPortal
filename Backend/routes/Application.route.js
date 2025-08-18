import express  from "express";
import  {ApplyJobs,GetAppliedJobs,GetApplicants,UpdateStatus}  from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const ApplicationRouter=express.Router();
ApplicationRouter.route("/apply/:id").post(isAuthenticated,ApplyJobs);
ApplicationRouter.route("/applied").get(isAuthenticated,GetAppliedJobs);
ApplicationRouter.route("/applied/:id").get(isAuthenticated,GetApplicants);
ApplicationRouter.route("/status/:id").put(isAuthenticated,UpdateStatus);
export default ApplicationRouter;