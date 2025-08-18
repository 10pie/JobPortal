import express from 'express';
import {createJob,GetAllJobs,getJobById,GetAllJobsByAdmin} from '../controllers/job.controller.js';
import isAuthenticated  from '../middlewares/isAuthenticated.js';
const JobRouter = express.Router();
JobRouter.route('/create').post(isAuthenticated, createJob);
JobRouter.route('/get-jobs').get(GetAllJobs);
JobRouter.route('/get/:id').get(getJobById);
JobRouter.route('/get-myjobs').get(isAuthenticated,GetAllJobsByAdmin);
export default JobRouter;